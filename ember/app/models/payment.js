import DS from 'ember-data';

export default DS.Model.extend({
  divvy: DS.belongsTo('divvy'),
  description: DS.attr('string')
});
