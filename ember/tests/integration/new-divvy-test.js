import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server;

module('Integration - New Trip Page', {
  beforeEach: function() {
    App = startApp();

    var divvies = [
      {
        id: 1,
        title: 'Divvy 1'
      },
      {
        id: 2,
        title: 'Divvy 2'
      },
      {
        id: 3,
        title: 'Divvy 3'
      }
    ];

    server = new Pretender(function() {
      this.get('/api/divvies', function() {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({divvies: divvies})];
      });

      this.post('/api/divvies', function() {
        var divvy = {
          id: 4,
          title: 'Divvy 4'
        };

        return [200, {"Content-Type": "application/json"}, JSON.stringify({divvy: divvy})];
      });
    });


    visit('/divvies/new');
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
