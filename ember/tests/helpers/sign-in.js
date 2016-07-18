import Ember from 'ember';

export default function signIn() {
  server.create('user', {username: 'Leo Mein'});
  return new Ember.RSVP.Promise(function(resolve) {
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
