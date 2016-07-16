import DS from 'ember-data';
import Session from "ember-simple-auth/services/session";

export default Session.extend({

  store: Ember.inject.service(),

  currentUser: Ember.computed('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
      let userId = this.get('data.authenticated.user_id');
      return this.get('store').findRecord('user', userId);
    }
  })

});
