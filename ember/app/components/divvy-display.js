import Ember from "ember";

export default Ember.Component.extend({

  session: Ember.inject.service(),

	actions: {
    deleteDivvy () {
      this.get('divvy').destroyRecord().then(() => {
        this.sendAction('transitionToIndex');
        this.sendAction('flashMessage', 'Your divvy has been successfully deleted', 'success');
      }, () => {
        this.sendAction('flashMessage', 'An error occurred while processing your request', 'warning');
      });
    },
    flashMessage() {
      return true; // bubble that ish up
    }
	}
});
