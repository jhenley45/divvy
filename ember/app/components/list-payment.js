import Ember from "ember";

export default Ember.ListPaymentComponent = Ember.Component.extend({
  session: Ember.inject.service(),

  actions : {
    toggleConfirmRemovePayment () {
      this.set('confirmRemove', !this.get('confirmRemove'));
    },
    showEditPayment () {
      this.set('isEditing', !this.get('isEditing'));
    },
    removePayment () {
      let payment = this.get('payment');
      payment.destroyRecord().then(() => {
        this.sendAction('flashMessage', 'Payment successfully deleted', 'success');
      }, function() {
        this.sendAction('flashMessage', 'An error occurred while processing your request', 'warning');
      });
    },
    updatePayment () {
      this.sendAction("edit");
      this.set('isEditing', false);
    }
  }

});
