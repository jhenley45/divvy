import Ember from "ember";
let $ = Ember.$;

export default Ember.Component.extend({

  session: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {
    addPaymentToDivvy () {
      // clear any lingering form errors
      this.set('formError', undefined);

      let amount = this.get('amount');
      let description = this.get('description');
      let user = this.get('session').get('currentUser');

      if (!amount || amount.length < 1 || $.trim(amount) === "") {
        this.set('formError', 'Amount field cannot be empty');
        return;
      } else if (isNaN(parseFloat(amount))) {
        this.set('formError', 'Amount value must be a number');
        return;
      } else {
        let divvy = this.get('divvy');
        let payment = this.get('store').createRecord('payment', {
          description: description,
          amount: amount,
          divvy: divvy,
          user: user
        });
        payment.save().then(() => {
          this.set('description', undefined);
          this.set('amount', undefined);
          this.sendAction('flash', 'New payment successfully created', 'success');
        }, () => {
          payment.deleteRecord();
          this.set('formError', "Something went wrong, please try again later.");
        });
      }
    }
  }

});
