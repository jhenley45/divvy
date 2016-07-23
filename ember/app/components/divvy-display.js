import Ember from "ember";

export default Ember.Component.extend({

  session: Ember.inject.service(),

	actions: {
    deleteDivvy () {
      this.get('divvy').destroyRecord().then(() => {
        this.sendAction('flashMessage', 'Your divvy has been successfully deleted', 'success');
        this.sendAction('transitionToIndex');
      }, () => {
        this.sendAction('flashMessage', 'An error occurred while processing your request', 'warning');
      });
    }
	}
});
