import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Divvy Page', {
  beforeEach: function() {
    App = startApp();
    signIn();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should show the divvy\'s title on the divvy route', (assert) => {
  let divvy = server.create('divvy', {title: 'Sunset over Hyrule'});

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('#divvy-title').text().trim(), divvy.title);
  });
});

test('Should display a message if there are no existing payments for a divvy', function(assert) {
  let divvy = server.create('divvy');

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('div.warning-block:contains("There are currently no payments for this divvy")').length, 1);
  });
});

test('Should display a list of payments for a divvy when there are payments', function(assert) {
  let divvy = server.create('divvy');
  let user = server.create('user', {username: "Test User 1", divvy: divvy});
  server.createList('payment', 3, { divvy, user });

  visit('/divvies/' + divvy.id);

	andThen(() => {
		assert.equal(find('div.payment').length, 3);
	});
});

test('Should be full width when there are no settlements', function(assert) {
  let divvy = server.create('divvy');

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('.divvy-container-full-width').length, 1);
  });
});

test('Should be adjusted width when there are settlements', function(assert) {
  let divvy = server.create('divvy');
  server.createList('settlement', 3, { divvy });

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('.divvy-container').length, 1);
  });
});

test('Should display the username of the payment owner when it is not the current user', function(assert) {
  let divvy = server.create('divvy');
  let user = server.create('user', {username: "Test User 1", divvy: divvy});
  server.create('payment', { divvy, user });
  server.create('payment', { divvy, user });


  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('div.payment:contains("Test User 1")').length, 2);
  });
});
