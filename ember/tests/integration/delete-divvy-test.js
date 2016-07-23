import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Delete Divvy', {
  beforeEach: function() {
    App = startApp();
    signIn();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});


test('Should have a button to allow the user to delete a divvy if they are the organizer', (assert) => {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  let otherUser = server.create('user', {divvy});
  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('button.standard-button:contains("Delete divvy")').length, 1);
  });
});

test('Should NOT have a button to allow the user to delete a divvy if they are not the organizer', (assert) => {
  let user = server.schema.users.find(1);
  let otherUser = server.create('user', {divvy});
  let divvy = server.create('divvy', { organizer: otherUser });
  divvy.update('organizer', otherUser);
  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('button.standard-button:contains("Delete divvy")').length, 0);
  });
});

test('Should redirect the user to the divvies page when delete divvy is clicked', (assert) => {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  let otherUser = server.create('user', {divvy});
  visit('/divvies/' + divvy.id);

  andThen(() => {
    click((find('button.standard-button:contains("Delete divvy")'))).then(() => {
      assert.equal(find('h3:contains("All Divvies")').length, 1);
    });
  });
});
