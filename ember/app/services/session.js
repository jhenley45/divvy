import Ember from 'ember';
import Session from "ember-simple-auth/services/session";

export default Session.extend({

  store: Ember.inject.service(),

  currentUser: Ember.computed('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
      let userId = this.get('data.authenticated.userId');
      return this.get('store').findRecord('user', userId);
    }
  })

});
