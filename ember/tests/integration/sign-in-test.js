import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Sign in', {
  beforeEach () {
    App = startApp();
    visit('/');
  },
  afterEach () {
    Ember.run(App, 'destroy');
  }
});

// When a user is not logged in
test('When not logged in, should have a sign in link in the navbar', function(assert) {
  assert.equal(find('#sign-in').text(), 'Sign in');
});

test('When not logged in, should have a sign up link in the navbar', function(assert) {
  assert.equal(find('#sign-up').text(), 'Sign up');
});

test('When not logged in, should not have a trips link in the navbar', function(assert) {
  assert.equal(find('a:contains("Trips")').length, 0);
});

test('When not logged in, should not have the account dropdown in the navbar', function(assert) {
  assert.equal(find('li.dropdown').length, 0);
});


// Sign in route tests
test('Should redirect user to sign in route when link is clicked', function(assert) {
  click(find('#sign-in')).then(function() {
    assert.equal(find('h2:contains("Sign In")').length, 1);
  });
});

test('Sign in page should have an input box for email address', function(assert) {
  click(find('#sign-in')).then(function() {
    assert.equal(find('input#email').length, 1);
  });
});

test('Sign in page should have an input box for password', function(assert) {
  click(find('#sign-in')).then(function() {
    assert.equal(find('input#password').length, 1);
  });
});

test('Sign in page should have a Login button', function(assert) {
  click(find('#sign-in')).then(function() {
    assert.equal(find('button:contains("Login")').length, 1);
  });
});

test('Should show an error message when the user submits an empty form', function(assert) {
  click(find('#sign-in')).then(function() {
    click(find('button:contains("Login")')).then(function() {
      assert.equal(find('div.error-message:contains("Email field cannot be empty")').length, 1);
    });
  });
});

test('Should show an error message when the user submits an empty password field', function(assert) {
  click(find('#sign-in')).then(function() {
    fillIn(find('input#email'), 'something@aol.com').then(function() {
      click(find('button:contains("Login")')).then(function() {
        assert.equal(find('div.error-message:contains("Password field cannot be empty")').length, 1);
      });
    });
  });
});

test('Should log the user in when the form is filled out', (assert) => {
  server.create('user');
  signIn().then(() => {
    assert.equal(find('li.user-menu').length, 1);
  });
});

test('Should display the username of the user in the nav bar header', function(assert) {
  server.create('user', {username: "Steve Ripley"});
  signIn().then(() => {
    assert.equal(find('a.dropdown-toggle:contains("Steve Ripley")').length, 1);
  });
});
