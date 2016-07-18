import Ember from "ember";
var $ = Ember.$;

export default Ember.Component.extend({

  session: Ember.inject.service('session'),

  actions: {
    createUser () {
      var email, password, passwordConfirmation;

      email = this.get('email');
      password = this.get('password');
      passwordConfirmation = this.get('passwordConfirmation');

      // clear any pre-existing errors
      this.set('formError', undefined);
      this.set('emailError', undefined);
      this.set('passwordError', undefined);
      this.set('passwordConfirmationError', undefined);

      if (!email) {
        this.set('emailError', 'You must provide an email address');
      } else if (!this.emailValidation(email)) {
        this.set('emailError', 'You must provide a valid email address');
      } else if (!password) {
        this.set('passwordError', 'You must provide a password');
      } else if (!passwordConfirmation) {
        this.set('passwordConfirmationError', 'You must provide a confirmation password');
      } else if (password !== passwordConfirmation) {
        this.set('passwordError', 'Your passwords do not match');
        this.set('passwordConfirmationError', 'Your passwords do not match');
      } else {

        $.ajax({
          url: "/api/users",
          type: "POST",
          data: { user : { email: email, password: password, password_confirmation: password } }
        }).then((response) => {
          Ember.run(() => {
            if (response.user) {
              // LOG THAT MOFO IN
              var credentials = { "email" : this.get('email'), "password" : this.get('password') };

              this.get('session').authenticate('authenticator:custom', credentials).then(() => {
                this.sendAction();
              }, function(message) {
                this.set('errorMessage', message);
              });
            } else if (response.error) {
              this.set('formError', response.error);
            }
          });
        }, function() {
          // handle error
        });
      }
    }
  },

  emailValidation (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

});
