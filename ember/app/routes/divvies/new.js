import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    transitionToDivvy (divvy) {
      this.transitionTo('divvy', divvy);
    }
  }
});
