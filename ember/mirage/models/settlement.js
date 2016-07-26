import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  divvy: belongsTo(),
  payer: belongsTo('user'),
  payee: belongsTo('user')
});
