import Ember from "ember";

export default Ember.Component.extend({

  session: Ember.inject.service('session'),

  actions: {
    login () {
      if (!this.get('identification')) {
        this.set('errorMessage', 'Email field cannot be empty');
      } else if (!this.get('password')) {
        this.set('errorMessage', 'Password field cannot be empty');
      } else {
        // all is well, call authenticate
        this.send('authenticate');
      }
    },
    authenticate () {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:devise', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }

});
