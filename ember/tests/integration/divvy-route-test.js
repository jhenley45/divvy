import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Trip Page', {
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
