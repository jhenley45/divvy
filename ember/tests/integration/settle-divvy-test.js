import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Settle divvy test', {
  beforeEach () {
    App = startApp();
    signIn();
  },
  afterEach () {
    Ember.run(App, 'destroy');
  }
});

test('Should have a "Settle Divvy" button if the current user is the organizer', (assert) => {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  server.createList('settlement', 4, { divvy });
  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('button:contains("Settle divvy")').length, 1);
  });
});

test('Should NOT have a "Settle Divvy" button if the current user is NOT the organizer', (assert) => {
  let divvy = server.create('divvy');
  let otherUser = server.create('user', {divvy});

  divvy.update('organizer', otherUser);
  server.createList('settlement', 4, { divvy });
  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('button:contains("Settle divvy")').length, 0);
  });
});

test('Should show a confirm button when the user clicks on Settle Trip', (assert) => {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  server.createList('settlement', 4, { divvy });
  visit('/divvies/' + divvy.id);

  andThen(() => {
    click(find('button:contains("Settle divvy")')).then(() => {
      assert.equal(find('button:contains("Yes")').length, 1);
    });
  });
});

test('Should show a cancel settle button when the user clicks to settle a divvy', (assert) => {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  server.createList('settlement', 4, { divvy });
  visit('/divvies/' + divvy.id);

  andThen(() => {
    click(find('button:contains("Settle divvy")')).then(() => {
      assert.equal(find('button:contains("No, cancel")').length, 1);
    });
  });
});

test('Should hide the delete payment option when the user clicks to cancel the deletion', (assert) => {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  server.createList('settlement', 4, { divvy });
  visit('/divvies/' + divvy.id);

  andThen(() => {
    click(find('button:contains("Settle divvy")')).then(() => {
      click(find('button:contains("No, cancel")')).then(() => {
        assert.equal(find('button:contains("No, cancel")').length, 0);
      });
    });
  });
});

test('Should deactivate the divvy once it is settled', (assert) => {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  server.createList('settlement', 4, { divvy });
  server.createList('payment', 4, { divvy, user });
  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('.new-payment-form').length, 1);
    assert.equal(find('div.action-button:contains("Add user")').length, 1);
    assert.equal(find('.payment-buttons').length, 4);

    click(find('button:contains("Settle divvy")')).then(() => {
      click(find('button:contains("Yes")')).then(() => {
        assert.equal(find('.divvy-header:contains("This divvy has been settled and is no longer active")').length, 1);
        assert.equal(find('.new-payment-form').length, 0);
        assert.equal(find('div:contains("Add user")').length, 0);
        assert.equal(find('.payment-buttons').length, 0);
      });
    });
  });
});
