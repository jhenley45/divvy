import Ember from "ember";

export default Ember.Component.extend({

	actions: {
    showConfirm() {
      this.set('showConfirm', true);
    },

    submitConfirm() {
      //call the onConfirm property to invoke the passed in action
      this.get('onConfirm')();
    },

    hideConfirm() {
      this.set('showConfirm', false);
    }
	}
});
