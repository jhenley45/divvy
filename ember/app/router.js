import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sign_up');
  this.route('sign_in');
  this.route('venmo');
  this.route('divvies', function() {
    this.route('new');
  });
  this.route('divvy', {path: 'divvies/:divvy_id'}, function() {

  });
});

export default Router;
