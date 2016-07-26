import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  divvy: belongsTo(),
  debts: hasMany('settlements', { inverse: 'payer'} ),
  credits: hasMany('settlements', { inverse: 'payee'} )
});
