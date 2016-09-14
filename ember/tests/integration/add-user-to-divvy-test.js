import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';
import { clickTrigger } from '../helpers/ember-power-select';

var App;

module('Integration - Add User To Divvy', {
  beforeEach () {
    App = startApp();
    signIn();
  },
  afterEach () {
    Ember.run(App, 'destroy');
  }
});

test('Should have a button to allow you to add a user to a trip', (assert) => {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});

  visit('/divvies/' + divvy.id);

  andThen(() => {
    assert.equal(find('div.action-button:contains("Add user")').length, 1);
  });
});

test('Should display a list of users when input is focused', (assert) => {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});
  server.createList('user', 5);

  visit('/divvies/' + divvy.id);

  andThen(() => {
    clickTrigger(".select-add-user");
    assert.equal(find('li.ember-power-select-option').length, 5);
  });
});

test('Should add user to input field when clicked', (assert) => {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});
  server.createList('user', 5);

  visit('/divvies/' + divvy.id);

  andThen(() => {
    selectChoose('.select-add-user', 'User 5');
    andThen(() => {
      assert.equal(find('.ember-power-select-multiple-remove-btn').length, 1);
    });
  });
});

test('Should remove selected user from the input field when clicked', (assert) => {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});
  server.createList('user', 5);

  visit('/divvies/' + divvy.id);

  andThen(() => {
    selectChoose('.select-add-user', 'User 5');
    andThen(() => {
      assert.equal(find('.ember-power-select-multiple-remove-btn').length, 1);
      removeMultipleOption('.select-add-user', 'User 5');
      andThen(() => {
        assert.equal(find('.ember-power-select-multiple-remove-btn').length, 0);
      });
    });
  });
});

test('Should display message when no users match search', (assert) => {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});

  visit('/divvies/' + divvy.id);

  andThen(() => {
    selectSearch('.select-add-user', 'meowmix is the best');
    andThen(() => {
      assert.equal(find('li:contains("No users found")').length, 1);
    });
  });
});

test('Should not show users who are already part of the divvy', (assert) => {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});
  server.createList('user', 5);

  visit('/divvies/' + divvy.id);

  andThen(() => {
    clickTrigger(".select-add-user");
    assert.equal(find('li.ember-power-select-option').length, 5);
  });
});

test('Should not show current user in the dropdown', (assert) => {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});
  server.createList('user', 5);

  let user = server.schema.users.find(1);
  user.divvy = divvy;

  visit('/divvies/' + divvy.id);

  andThen(() => {
    clickTrigger(".select-add-user");
    assert.equal(find('li.ember-power-select-option:contains("Leo Mein")').length, 0);
  });
});

test('Should filter search results when input is given and there is a match', (assert) => {
  let divvy = server.create('divvy');
  server.create('user', {username: "meow"});
  server.create('user', {username: "meow two"});
  server.create('user', {divvy, username: "captain ahab"});

  visit('/divvies/' + divvy.id);

  andThen(() => {
    selectSearch('.select-add-user', 'm');
    andThen(() => {
      assert.equal(find('li.ember-power-select-option').length, 2);
    });
  });
});

// should add user(s) to the trip if selected
test('Should add user to trip when add user button is clicked', (assert) => {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});
  server.createList('user', 5);

  visit('/divvies/' + divvy.id);

  andThen(() => {
    selectChoose('.select-add-user', 'User 5');
    andThen(() => {
      click(find('.action-button:contains("Add user")')).then(() => {
        assert.equal(find('.divvy-member:contains("User 5")').length, 1);
      });
    });
  });
});


// should clear form after user is added to trip
test('Should clear added user from the form once user is added', (assert) => {
  let divvy = server.create('divvy');
  server.createList('user', 3, {divvy});
  server.createList('user', 5);

  visit('/divvies/' + divvy.id);

  andThen(() => {
    selectChoose('.select-add-user', 'User 5');
    andThen(() => {
      click(find('.action-button:contains("Add user")')).then(() => {
        assert.equal(find('.ember-power-select-multiple-remove-btn').length, 0);
      });
    });
  });
});
