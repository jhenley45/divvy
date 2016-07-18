import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - New Divvy Page', {
  beforeEach: function() {
    App = startApp();
    server.createList('divvy', 3);
    signIn().then(() => {
      visit('/divvies/new');
    });
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have a title of "Create new divvy"', function(assert) {
  assert.equal(find('h3:contains("Create new divvy")').length, 1);
});

test('Should have an input for the Title field', function(assert) {
  assert.equal(find('input#divvy-title').length, 1);
});

test('Should have a submit button', function(assert) {
  assert.equal(find('button:contains("Submit")').length, 1);
});

test('Should show an error message when the user submits the form with an empty title', function(assert) {
  click(find('button:contains("Submit")')).then(function() {
    assert.equal(find('p.error-message:contains("Title field cannot be empty")').length, 1);
  });
});

test('Should show an error message when the user submits a title of just whitespace', function(assert) {
  fillIn(find('input#divvy-title'), '   ').then(function() {
    click(find('button:contains("Submit")')).then(function() {
      assert.equal(find('p.error-message:contains("Title field cannot be empty")').length, 1);
    });
  });
});

test('Should have a "Back" link', function(assert) {
  assert.equal(find('a:contains("Back")').length, 1);
});

test('Should not create a new divvy unless the user clicks submit', function(assert) {
  click(find('a:contains("Back")')).then(function() {
    assert.equal(find('li.divvy-list').length, 3);
  });
});

test('Should transition the user to the new divvy route after successfully creating a new divvy.', function(assert) {
  fillIn(find('input#divvy-title'), 'Divvy 4').then(function() {
    click(find('button:contains("Submit")')).then(function() {
      assert.equal(find('#divvy-title').text().trim(), 'Divvy 4');
    });
  });
});

// Not quite working, need to figure out how to work with Ember.run.later
// test('Should display an success message when the user successfully creates a new divvy.', function(assert) {
//   fillIn(find('input#divvy-title'), 'Trip 4').then(function() {
//     click(find('button:contains("Submit")')).then(function() {
//       assert.equal(find('div.flash-success').length, 1);
//     });
//   });
// });

// ALSO TO DO:
// test for flash message when shit goes wrong
