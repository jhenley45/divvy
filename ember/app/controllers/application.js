import Ember from "ember";

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  
  flashArray: Ember.A([])
});
