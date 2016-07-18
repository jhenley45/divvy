import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  // invalidate() {
  //   return new Ember.RSVP.Promise(function(resolve) {
  //     $.ajax({
  //       url: "api/users/sign_out",
  //       type: "DELETE"
  //     }).always(function() {
  //       resolve();
  //     });
  //   });
  // }
});
