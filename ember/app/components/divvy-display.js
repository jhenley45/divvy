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
    flashMessage () {
      return true; // bubble that ish up
    },
    settleDivvy () {
      let divvy = this.get('divvy');

      divvy.set('isSettled', true);
      divvy.save().then(() => {
        this.send('flashMessage', 'Your divvy has been settled. Please allow a few moments for Venmo to process', 'success');
      }, () => {
        this.send('flashMessage', 'There was an error while trying to process your request. Please try again later.', 'warning');
        divvy.set('isSettled', false);
      });
    },
	}
});
