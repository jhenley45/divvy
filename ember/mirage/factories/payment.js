import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  description(i) {return "test payment " + i},
  amount: 1
});
