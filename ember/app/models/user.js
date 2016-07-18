import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  isVenmoAuthorized: DS.attr('boolean'),

  divvy: DS.belongsTo('divvy'),
  payments: DS.hasMany('payment'),
  // settlements: DS.hasMany('settlement', {
  //   inverse: 'payer'
  // })
});
