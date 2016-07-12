import Ember from 'ember';

export default Ember.Object.extend({
  init : function() {
      this.set('className', 'flash-' + this.get('type'));
  }
});
