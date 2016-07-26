import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  amount(i) { return i; }
});
