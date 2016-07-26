import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  isVenmoAuthorized: DS.attr('boolean'),

  // Relationships
  divvy: DS.belongsTo('divvy'),
  organizedDivvies: DS.hasMany('divvies', { inverse: 'organizer' }),
  payments: DS.hasMany('payment'),
  debts: DS.hasMany('settlements', { inverse: 'payer' }),
  credits: DS.hasMany('settlements', { inverse: 'payee' })
});
