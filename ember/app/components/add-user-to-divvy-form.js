import Ember from "ember";

const {computed} = Ember;

export default Ember.Component.extend({

  session: Ember.inject.service(),

  actions: {
    clickAddUsers() {
      this.get('addUsers')();
    }
  },

  filteredUsers: computed('users.[]', 'session.currentUser.id', {
    get() {
      let divvyUserIds = this.get('divvy.users').mapBy('id');
      let users = this.get('users');
      let currentUserId = this.get('session.currentUser.id');
      divvyUserIds.pushObject(currentUserId);

      return users.reject((user) => {
        let userId = user.get('id');
        return divvyUserIds.contains(userId);
      });
    }
  }),

});
