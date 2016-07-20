import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Delete Payment', {
  beforeEach () {
    App = startApp();
    signIn();
  },
  afterEach () {
    Ember.run(App, 'destroy');
  }
});


// DELETE PAYMENT
test('Should have a button to allow the user to delete a payment from the trip if it belongs to that user', (assert) => {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  server.create('payment', { divvy, user });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    triggerEvent(".payment:contains('You')", "mouseenter").then(() => {
      assert.equal(find('i#remove-payment').length, 1);
    });
  });
});

test('Should confirm that the payment should be deleted when user clicks to delete payment', function(assert) {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  server.create('payment', { divvy, user });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    triggerEvent(".payment:contains('You')", "mouseenter").then(function() {
      click(find('i#remove-payment')).then(function() {
        assert.equal(find('button:contains("Yes")').length, 1);
      });
    });
  });
});

test('Should delete the payment when the user clicks to confirm the deletion', function(assert) {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  let otherUser = server.create('user');
  server.create('payment', { divvy, user });
  server.createList('payment', 3, {divvy, user: otherUser});

  visit('/divvies/' + divvy.id);
  andThen(() => {
    triggerEvent(".payment:contains('You')", "mouseenter").then(function() {
      click(find('i#remove-payment')).then(function() {
        click(find('button:contains("Yes")')).then(function() {
          assert.equal(find('div.payment').length, 3);
        });
      });
    });
  });
});

test('Should display a cancel delete button when user clicks to delete payment', (assert) => {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  server.create('payment', { divvy, user });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    triggerEvent(".payment:contains('You')", "mouseenter").then(() => {
      click(find('i#remove-payment')).then(() => {
        assert.equal(find('button:contains("No, cancel")').length, 1);
      });
    });
  });
});

test('Should hide the delete payment option when the user clicks to cancel the deletion', function(assert) {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  server.create('payment', { divvy, user });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    triggerEvent(".payment:contains('You')", "mouseenter").then(() => {
      click(find('i#remove-payment')).then(() => {
        click(find('button:contains("No, cancel")')).then(() => {
          assert.equal(find('button:contains("No, cancel")').length, 0);
        });
      });
    });
  });
});
