import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model (params) {
    let divvy = this.store.findRecord('divvy', params.divvy_id);
    let users = this.store.findAll('user');

    return Ember.RSVP.hash({
      divvy: divvy,
      users: users
    });
  },
  setupController (controller, model) {
    this._super(controller, model);
    controller.setProperties(model);
  }
});
