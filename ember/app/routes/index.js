import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: Ember.inject.service('session'),

  beforeModel () {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('sign_in');
    } else if (!this.get('session.data.authenticated.isVenmoAuthorized')) {
      this.transitionTo('venmo');
    }
  },
  model () {
    return this.store.findAll('divvy');
  }
});
