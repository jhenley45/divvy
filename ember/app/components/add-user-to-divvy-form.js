import Ember from "ember";

const {computed} = Ember;

export default Ember.Component.extend({

  selectedUsers: [],

  session: Ember.inject.service(),

  filteredUsers: computed('users.[]', {
    get() {
      let divvyId = this.get('divvy.id');
      let users = this.get('users');

      return users.reject((user, index, users) => {
        return user.get('divvy.id') === divvyId;
      });
    }
  }),

});
