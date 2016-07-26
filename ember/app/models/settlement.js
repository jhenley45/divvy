import DS from 'ember-data';

export default DS.Model.extend({
  divvy: DS.belongsTo('divvy'),
  amount: DS.attr('number'),
  payer: DS.belongsTo('user'),
  payee: DS.belongsTo('user')
});
