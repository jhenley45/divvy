import Ember from 'ember';
import { module, test } from 'qunit';

export default function signIn() {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    visit('/').then(function() {
      click(find('#sign-in')).then(function() {
        fillIn(find('input#email'), 'something@aol.com');
        fillIn(find('input#password'), 'mycoolpass1').then(function() {
          click(find('button:contains("Login")')).then(function() {
            resolve();
          });
        });
      });
    });
  });
}
