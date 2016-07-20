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
      // clear any lingering form errors
      this.set('updatePaymentError', undefined);

      let payment = this.get('payment');
      let amount = payment.get('amount');

      if (!amount || amount.length < 1 || $.trim(amount) === "") {
        this.set('updatePaymentError', 'Amount field cannot be empty');
        return;
      } else if (isNaN(parseFloat(amount))) {
        this.set('updatePaymentError', 'Amount value must be a number');
        return;
      } else {
        payment.save().then(() => {
          this.set('isEditing', false);
          this.sendAction('flashMessage', 'Payment successfully updated', 'success');
        }, () => {
          this.sendAction('flashMessage', 'An error occurred while processing your request', 'warning');
        });
      }
    }
  }

});
