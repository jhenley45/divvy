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
  server.createList('user', 5);

  visit('/divvies/' + divvy.id);

  andThen(() => {
    click(find('.ember-power-select-trigger-multiple-input')).then(() => {
      assert.equal(find('li.ember-power-select-option').length, 6);
    });
  });
});

test('Should add user to input field when clicked', function(assert) {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});
  server.createList('user', 5);

  visit('/divvies/' + divvy.id);

  andThen(() => {
    click(find('.ember-power-select-trigger-multiple-input')).then(() => {
      click(find('li.ember-power-select-option:contains("User 5")')).then(() => {
        assert.equal(find('.ember-power-select-multiple-remove-btn').length, 1);
      });
    });
  });
});

test('Should display message when no users match search', function(assert) {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});

  visit('/divvies/' + divvy.id);

  andThen(() => {
    fillIn(find('.ember-power-select-trigger-multiple-input'), 'meowmix is the best').then(() => {
      assert.equal(find('li:contains("No users found")').length, 1);
    });
  });
});

test('Should not show users who are already part of the divvy', function(assert) {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});
  server.createList('user', 5);

  visit('/divvies/' + divvy.id);

  andThen(() => {
    click(find('.ember-power-select-trigger-multiple-input')).then(() => {
      assert.equal(find('li.ember-power-select-option').length, 6);
    });
  });
});

// does not display users already in list
// should filter search resutls based on input
// should
