import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - New Payment', {
  beforeEach () {
    App = startApp();
    signIn();
    andThen(() => {
      let divvy = server.create('divvy');
      let user = server.create('user');
      server.createList('payment', 3, { divvy, user });

      visit('divvies/' + divvy.id);
    });
  },
  afterEach () {
    Ember.run(App, 'destroy');
  }
});


test('Should have a button to allow the user to create a new payment for the divvy', (assert) => {
  assert.equal(find('div.standard-button:contains("Add payment")').length, 1);
});

test('Should display a form with input fields for the new payment', (assert) => {
  assert.equal(find('.transparent-input').length, 2);
});

test('Should display an error message when no amount is provided.', (assert) => {
  fillIn(find('input#description'), 'Test Payment 4');
  click(find('.action-button:contains("Add payment")')).then(() => {
    assert.equal(find('div.error-message:contains("Amount field cannot be empty")').length, 1);
  });
});

test('Should display an error message when amount is not an integer.', (assert) => {
  fillIn(find('input#description'), 'Test Payment 4');
  fillIn(find('input#amount'), 'Monayyyy');
  click(find('.action-button:contains("Add payment")')).then(() => {
    assert.equal(find('div.error-message:contains("Amount value must be a number")').length, 1);
  });
});

test('Should display an error message when empty string is entered.', (assert) => {
  fillIn(find('input#description'), 'Test Payment 4');
  fillIn(find('input#amount'), '  ');
  click(find('.action-button:contains("Add payment")')).then(() => {
    assert.equal(find('div.error-message:contains("Amount field cannot be empty")').length, 1);
  });
});

test('Should add the payment to the list of existing divvy payments after it is created.', (assert) => {
  fillIn(find('input#description'), 'Test Payment 4');
  fillIn(find('input#amount'), '230');
  click(find('.action-button:contains("Add payment")')).then(() => {
    assert.equal(find('div.payment').length, 4);
  });
});

test('Should clear the new payment form after payment has been added.', (assert) => {
  fillIn(find('input#description'), 'Test Payment 4');
  fillIn(find('input#amount'), '230');
  click(find('.action-button:contains("Add payment")')).then(() => {
    assert.equal(find('input#amount').text(), '');
    assert.equal(find('input#description').text(), '');
  });
});

test('Should show an error if something went wrong', (assert) => {
  fillIn(find('input#description'), 'Test error');
  fillIn(find('input#amount'), '230');
  click(find('.action-button:contains("Add payment")')).then(() => {
    assert.equal(find('div.error-message:contains("Something went wrong, please try again later.")').length, 1);
  });
});
