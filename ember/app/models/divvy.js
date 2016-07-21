import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  payments: DS.hasMany('payment'),
  settlements: DS.hasMany('settlements'),
  users: DS.hasMany('user'),
  organizer: DS.belongsTo('user', { inverse: 'organizedDivvies' }),

  usersWithoutOrganizer: function() {
    return this.get('users').filter((user) => {
      if (user.get('id') === String(this.get('organizer.id'))) {
        return false;
      } else {
        return true;
      }
    });
  }.property('users.@each', 'organizer')
});
