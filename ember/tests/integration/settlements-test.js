import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Settlement test', {
  beforeEach () {
    App = startApp();
    signIn();
  },
  afterEach () {
    Ember.run(App, 'destroy');
  }
});

test('Should show the Trip Summary sidebar when there are settlements', (assert) => {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  let otherUser = server.create('user', {divvy});
  server.createList('settlement', 4, { divvy });

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('div.section-title:contains("Divvy Summary")').length, 1);
  });
});


test('Should NOT show the Trip Summary sidebar when there are no settlements', function(assert) {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  let otherUser = server.create('user', {divvy});

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('div.section-title:contains("Divvy Summary")').length, 0);
  });
});

test('Should show a list of all settlements', function(assert) {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  let otherUser = server.create('user', {divvy});
  server.createList('settlement', 4, { divvy });

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('div.settlement').length, 4);
  });
});

test('Should say the amount for each settlement', function(assert) {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  let otherUser = server.create('user', {divvy});
  server.createList('settlement', 4, { divvy, amount: 3 });

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('span.settlement-amount').text(), "$3$3$3$3");
  });
});

test('Should say who owes who for a settlement', function(assert) {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  let payer = server.create('user', {divvy, username: 'Steve'});
  let payee = server.create('user', {divvy, username: 'Hank'});
  server.createList('settlement', 4, { divvy, amount: 3, payer, payee });

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('div.settlement:contains("Steve owes")').length, 4);
    assert.equal(find('div.settlement:contains("Hank")').length, 4);
  });
});

test('Should display "You" when current user is involved in a settlement', function(assert) {
  let user = server.schema.users.find(1);
  let divvy = server.create('divvy', { organizer: user });
  let payer = server.create('user', {divvy, username: 'Steve'});
  server.createList('settlement', 4, { divvy, amount: 3, payer, payee: user });

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('div.settlement:contains("you")').length, 4);
  });
});
