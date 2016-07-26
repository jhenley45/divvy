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
  server.createList('settlement', 4, { divvy })

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('div.section-title:contains("Divvy Summary")').length, 1);
  });
});

//
// test('Should NOT show the Trip Summary sidebar when there are no settlements', function(assert) {
//   visit('/trips/1').then(function() {
//     assert.equal(find('div.section-title:contains("Trip Summary")').length, 0);
//   });
// });
//
// test('Should show a list of all settlements', function(assert) {
//   assert.equal(find('div.settlement').length, 4);
// });
//
// test('Should say the amount for each settlement', function(assert) {
//   assert.equal(find('span.settlement-amount').text(), "$49.98$43.43$20.65$12.43");
// });
//
// test('Should say who owes who for a settlement', function(assert) {
//   assert.equal(find('div.settlement:contains("test_user1 owes test_user2 $49.98")').length, 1);
// });
