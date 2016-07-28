import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Add User To Divvy', {
  beforeEach () {
    App = startApp();
    signIn();
  },
  afterEach () {
    Ember.run(App, 'destroy');
  }
});

test('Should have a button to allow you to add a user to a trip', function(assert) {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('div.action-button:contains("Add user")').length, 1);
  });
});

test('Should display a list of users when input is focused', function(assert) {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});

  visit('/divvies/' + divvy.id);

  andThen(() => {
    click(find('input#add-user')).then(() => {
      assert.equal(find('li.divvy-user-list').length, 5);
    });
  });
});
