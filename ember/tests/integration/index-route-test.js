import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';
// import { invalidateSession } from 'divvy/tests/helpers/ember-simple-auth';

var App;

module('Integration - Index Page', {
  beforeEach: function() {
    App = startApp();
    server.createList('divvy', 3);
    signIn();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

// test('Should not be able to access the index page when not signed in', (assert) => {
//   invalidateSession(App);
//   visit('/');
//
//   andThen(() => {
//     assert.equal(find('h2:contains("Sign In")').length, 1);
//   });
// });

test('Should have a title of "All Divvies"', (assert) => {
  assert.equal(find('h3').text(), 'All Divvies');
});

test('Should display a list of divvies', (assert) => {
  assert.equal(find('li.divvy-list').length, 3);
});

test('Should display the title of each divvy in a link', (assert) => {
	assert.equal(find('a:contains("Divvy 0")').length, 1);
	assert.equal(find('a:contains("Divvy 1")').length, 1);
	assert.equal(find('a:contains("Divvy 2")').length, 1);
});

test('Should be able to go to a divvy page from the index route', (assert) => {
  click('a:contains("Divvy 1")').then(() => {
    assert.equal(find('#divvy-title').text().trim(), 'Divvy 1');
  });
});

test('Should be able to go to new divvy page from index route', (assert) => {
  click(find('a:contains("Create New Divvy")')).then(() => {
  	assert.equal(find('h3:contains("Create new divvy")').length, 1);
  });
});

// test('Should display users on the divvy page after transitioning from index route', (assert) => {
//   let divvy = server.schema.divvies.find(1);
//   server.createList('user', 3, {divvy})
//   click('a:contains("Divvy 0")');
//   andThen(() => {
//     assert.equal(find('.divvy-member').length, 4);
//   });
// });
