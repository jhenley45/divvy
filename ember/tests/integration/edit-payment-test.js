import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Edit Payment', {
  beforeEach () {
    App = startApp();
    signIn();
  },
  afterEach () {
    Ember.run(App, 'destroy');
  }
});


test('Should not have a button to allow the user to edit a payment from the trip if it belongs to that user', (assert) => {
  let divvy = server.create('divvy');
  let otherUser = server.create('user');
  server.createList('payment', 3, { divvy, user: otherUser });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    assert.equal(find('i#edit-payment').length, 0);
  });
});

test('Should have a button to allow the user to edit a payment from the trip if it belongs to that user', (assert) => {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  server.create('payment', { divvy, user });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    assert.equal(find('i#edit-payment').length, 1);
  });
});

test('Should display an inline edit form when the user clicks to edit a payment', (assert) => {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  server.create('payment', { divvy, user });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    click(find('i#edit-payment')).then(() => {
      assert.equal(find('.payment .transparent-input').length, 2);
    });
  });
});

test('Should display an update payment button when the user clicks to edit a payment', (assert) => {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  server.create('payment', { divvy, user });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    click(find('i#edit-payment')).then(() => {
      assert.equal(find('.standard-button:contains("Update")').length, 1);
    });
  });
});

test('Should save the payment and redisplay when the user clicks to update it', (assert) => {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  server.create('payment', { divvy, user });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    click(find('i#edit-payment')).then(() => {
      fillIn(find('.edit-payment-amount'), '60');
      fillIn(find('.edit-payment-description'), 'new underwear');
      click(find('.standard-button:contains("Update")')).then(() => {
        assert.equal(find('.payment-amount:contains("60")').length, 1);
        assert.equal(find('.payment-description:contains("new underwear")').length, 1);
      });
    });
  });
});

test('Should show an error when no amount is provided', (assert) => {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  server.create('payment', { divvy, user });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    click(find('i#edit-payment')).then(() => {
      fillIn(find('.edit-payment-amount'), '');
      fillIn(find('.edit-payment-description'), 'new underwear');
      click(find('.standard-button:contains("Update")')).then(() => {
        assert.equal(find('div.error-message:contains("Amount field cannot be empty")').length, 1);
      });
    });
  });
});

test('Should show an error when amount is not an integer', (assert) => {
  let divvy = server.create('divvy');
  let user = server.schema.users.find(1);
  server.create('payment', { divvy, user });

  visit('/divvies/' + divvy.id);
  andThen(() => {
    click(find('i#edit-payment')).then(() => {
      fillIn(find('.edit-payment-amount'), 'dfds');
      fillIn(find('.edit-payment-description'), 'new underwear');
      click(find('.standard-button:contains("Update")')).then(() => {
        assert.equal(find('div.error-message:contains("Amount value must be a number")').length, 1);
      });
    });
  });
});
