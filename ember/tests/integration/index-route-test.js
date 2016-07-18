import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

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

test('Should have a title of "All Divvies"', function(assert) {
  assert.equal(find('h3').text(), 'All Divvies');
});

test('Should display a list of divvies', function(assert) {
  assert.equal(find('li.divvy-list').length, 3);
});

test('Should display the title of each divvy in a link', function(assert) {
	assert.equal(find('a:contains("Divvy 0")').length, 1);
	assert.equal(find('a:contains("Divvy 1")').length, 1);
	assert.equal(find('a:contains("Divvy 2")').length, 1);
});

test('Should be able to go to a divvy page from the index route', function(assert) {
  click('a:contains("Divvy 1")').then(function() {
    assert.equal(find('#divvy-title').text().trim(), 'Divvy 1');
  });
});

test('Should be able to go to new divvy page from index route', function(assert) {
  click(find('a:contains("Create New Divvy")')).then(function() {
  	assert.equal(find('h3:contains("Create new divvy")').length, 1);
  });
});
