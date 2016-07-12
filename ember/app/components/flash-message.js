import Ember from "ember";

export default Ember.FlashMessageComponent = Ember.Component.extend({
  classNameBindings: ['setClass'],

  setClass: function() {
    return this.get('firstFlash').className;
  }.property('firstFlash'),

  firstFlash: function() {
    return this.get('flashArray').get('firstObject');
  }.property('flashArray.@each'),

  didInsertElement () {
  	var time = 3000;
    this.$().fadeOut(time);

    Ember.run.later(this, function() {
      this.get('flashArray').shiftObject();
      if (this.get('flashArray').get('length')) {
      	this.rerender();
      } else {
        this.destroy();
      }
    }, time);
  }
});
