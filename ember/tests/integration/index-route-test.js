import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server;

module('Integration - Index Page', {
  beforeEach: function() {
    App = startApp();

    var divvies = [
      {
        id: 1,
        title: 'Divvy 1'
      },
      {
        id: 2,
        title: 'Divvy 2'
      },
      {
        id: 3,
        title: 'Divvy 3'
      }
    ];

    server = new Pretender(function() {
      this.get('/api/divvies', function() {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({divvies: divvies})];
      });

      this.get('/api/divvies/:id', function() {
        var divvy = {
          id: 1,
          title: 'Divvy 1'
        };

        return [200, {"Content-Type": "application/json"}, JSON.stringify({divvy: divvy})];
      });
    });


    visit('/');
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('Should have a title of "All Divvies"', function(assert) {
  assert.equal(find('h3').text(), 'All Divvies');
});

test('Should display a list of divvies', function(assert) {
  assert.equal(find('li.divvy-list').length, 3);
});

test('Should display the title of each divvy in a link', function(assert) {
	assert.equal(find('a:contains("Divvy 1")').length, 1);
	assert.equal(find('a:contains("Divvy 2")').length, 1);
	assert.equal(find('a:contains("Divvy 3")').length, 1);
});

test('Should be able to go to a divvy page from the index route', function(assert) {
  click('a:contains("Divvy 1")').then(function() {
    assert.equal(find('#divvy-title').text().trim(), 'Divvy 1');
  });
});
