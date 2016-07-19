import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  payments: DS.hasMany('payment'),
  settlements: DS.hasMany('settlements'),
  users: DS.hasMany('user'),
  organizerId: DS.attr('number'),

  usersWithoutOrganizer: function() {
    return this.get('users').filter((user) => {
      if (user.get('id') === String(this.get('organizerId'))) {
        return false;
      } else {
        return true;
      }
    })
  }.property('users.@each', 'organizerId')
});
