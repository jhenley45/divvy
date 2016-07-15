import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  description(i) { return `Test payment ${i}`; }
});
