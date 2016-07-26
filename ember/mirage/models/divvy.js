import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  organizer: belongsTo('user'),
  users: hasMany('users'),
  payments: hasMany('payments'),
  settlements: hasMany('settlements')
});
