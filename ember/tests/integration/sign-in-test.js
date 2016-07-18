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
test('When not logged in, should have a sign in link in the navbar', (assert) => {
  assert.equal(find('#sign-in').text(), 'Sign in');
});

test('When not logged in, should have a sign up link in the navbar', (assert) => {
  assert.equal(find('#sign-up').text(), 'Sign up');
});

test('When not logged in, should not have a trips link in the navbar', (assert) => {
  assert.equal(find('a:contains("Trips")').length, 0);
});

test('When not logged in, should not have the account dropdown in the navbar', (assert) => {
  assert.equal(find('li.dropdown').length, 0);
});


// Sign in route tests
test('Should redirect user to sign in route when link is clicked', (assert) => {
  click(find('#sign-in')).then(() => {
    assert.equal(find('h2:contains("Sign In")').length, 1);
  });
});

test('Sign in page should have an input box for email address', (assert) => {
  click(find('#sign-in')).then(() => {
    assert.equal(find('input#email').length, 1);
  });
});

test('Sign in page should have an input box for password', (assert) => {
  click(find('#sign-in')).then(() => {
    assert.equal(find('input#password').length, 1);
  });
});

test('Sign in page should have a Login button', (assert) => {
  click(find('#sign-in')).then(() => {
    assert.equal(find('button:contains("Login")').length, 1);
  });
});

test('Should show an error message when the user submits an empty form', (assert) => {
  click(find('#sign-in')).then(() => {
    click(find('button:contains("Login")')).then(() => {
      assert.equal(find('div.error-message:contains("Email field cannot be empty")').length, 1);
    });
  });
});

test('Should show an error message when the user submits an empty password field', (assert) => {
  click(find('#sign-in')).then(() => {
    fillIn(find('input#email'), 'something@aol.com').then(() => {
      click(find('button:contains("Login")')).then(() => {
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

test('Should display the username of the user in the nav bar header', (assert) => {
  server.create('user', {username: "Steve Ripley"});
  signIn().then(() => {
    assert.equal(find('a.dropdown-toggle:contains("Steve Ripley")').length, 1);
  });
});

test('Should redirect the user to the index route after they log in', (assert) => {
  server.create('user', {username: "Steve Ripley"});
  signIn().then(() => {
    assert.equal(find('h3:contains("All Divvies")').length, 1);
  });
});

test('Should display an error if the email is not registered', (assert) => {
  // server.get('/users', {errors: ['there was an error']}, 404);
  server.create('user', {username: "Steve Ripley"});
  visit('/').then(() => {
    click(find('#sign-in')).then(() => {
      fillIn(find('input#email'), 'faker@aol.com');
      fillIn(find('input#password'), 'mycoolpass1').then(() => {
        click(find('button:contains("Login")')).then(() => {
          assert.equal(find('.error-message:contains("That email and password combination is incorrect")').length, 1);
        });
      });
    });
  });
});

test('Should not allow the user to visit the sign in route when they are logged in', (assert) => {
  signIn();
  visit('sign_in');

  andThen(() => {
    assert.equal(currentRouteName(), 'index');
  });
});
