import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Sign out', {
  beforeEach: function() {
    App = startApp();
    server.create('user', {username: 'MeowMan'});
    signIn();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('When logged in, should have a sign out link nested under the dropdown in the navbar', function(assert) {
  click(find('a.dropdown-toggle:contains("MeowMan")')).then(function() {
    assert.equal(find('ul.dropdown-menu:contains("Sign out")').length, 1);
  });
});

// test('Should invalidate the user session when the user clicks to Sign out', function(assert) {
//   click(find('a.dropdown-toggle:contains("TestUser64")')).then(function() {
//     click(find('a:contains("Sign out")')).then(function() {
//       assert.equal(find('#sign-in').length, 1);
//     });
//   });
// });
