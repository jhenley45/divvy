import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Divvy Page', {
  beforeEach: function() {
    App = startApp();
    //visit('/divvies/1');
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
  server.createList('payment', 3, { divvy })

  visit('/divvies/' + divvy.id);

	andThen(() => {
		assert.equal(find('div.payment').length, 3);
	});
});
