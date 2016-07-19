import DS from 'ember-data';

export default DS.Model.extend({
  divvy: DS.belongsTo('divvy'),
  user: DS.belongsTo('user'),
  description: DS.attr('string'),
  amount: DS.attr('number')
});
