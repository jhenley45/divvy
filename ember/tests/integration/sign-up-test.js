import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;
var createAccountText = "Create Account";

module('Integration - Sign up', {
  beforeEach () {
    App = startApp();
    visit('/');
  },
  afterEach () {
    Ember.run(App, 'destroy');
  }
});

test('Should have a sign up link in the navbar', (assert) => {
  assert.equal(find('#sign-up').text(), 'Sign up');
});

test('Sign up link should take user to sign up route', (assert) => {
  click(find('#sign-up')).then(() => {
    assert.equal(find('h2').text(), 'Create Account');
  });
});

test('Should not allow the user to visit the sign up route when they are logged in', (assert) => {
  signIn();
  visit('sign_up');

  andThen(() => {
    assert.equal(currentRouteName(), 'index');
  });
});


test('Sign up page should have an input box for email address', (assert) => {
  click(find('#sign-up')).then(() => {
    assert.equal(find('input#email').length, 1);
  });
});

test('Sign up page should have an input box for password', (assert) => {
  click(find('#sign-up')).then(() => {
    assert.equal(find('input#password').length, 1);
  });
});

test('Sign up page should have an input box for repeat password', (assert) => {
  click(find('#sign-up')).then(() => {
    assert.equal(find('input#repeat-password').length, 1);
  });
});

test('Should have a submit button with ' + createAccountText, (assert) => {
  click(find('#sign-up')).then(() => {
    assert.equal(find('button:contains(' + createAccountText + ')').length, 1);
  });
});

test('Should show an error message when the user submits an empty form', (assert) => {
  click(find('#sign-up')).then(() => {
    click(find('button:contains(' + createAccountText + ')')).then(() => {
      assert.equal(find('p:contains("You must provide an email address")').length, 1);
    });
  });
});


test('Should show an error message when the user submits an invalid email address', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), 'something').then(() => {
      click(find('button:contains(' + createAccountText + ')')).then(() => {
        assert.equal(find('p:contains("You must provide a valid email address")').length, 1);
      });
    });
  });
});

test('Should show an error message when the user submits an invalid email address', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), '@aol.com').then(() => {
      click(find('button:contains(' + createAccountText + ')')).then(() => {
        assert.equal(find('p:contains("You must provide a valid email address")').length, 1);
      });
    });
  });
});

test('Should show an error message when the user submits an invalid email address', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), 'something@else.').then(() => {
      click(find('button:contains(' + createAccountText + ')')).then(() => {
        assert.equal(find('p:contains("You must provide a valid email address")').length, 1);
      });
    });
  });
});

test('Should clear the error if the user corrects an invalid email address', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), 'something@else.').then(() => {
      click(find('button:contains(' + createAccountText + ')')).then(() => {
        fillIn(find('input#email'), 'something@else.com').then(() => {
          click(find('button:contains(' + createAccountText + ')')).then(() => {
            assert.equal(find('p:contains("You must provide a valid email address")').length, 0);
          });
        });
      });
    });
  });
});

test('Should clear the error if the user corrects an empty email address', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), '').then(() => {
      click(find('button:contains(' + createAccountText + ')')).then(() => {
        fillIn(find('input#email'), 'something@else.com').then(() => {
          click(find('button:contains(' + createAccountText + ')')).then(() => {
            assert.equal(find('p:contains("You must provide an email address")').length, 0);
          });
        });
      });
    });
  });
});

test('Should show an error message when the user submits an empty password field', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), 'something@else.com');
    click(find('button:contains(' + createAccountText + ')')).then(() => {
      assert.equal(find('p:contains("You must provide a password")').length, 1);
    });
  });
});

test('Should clear the error if the user corrects an empty password', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), 'something@aol.com').then(() => {
      click(find('button:contains(' + createAccountText + ')')).then(() => {
        fillIn(find('input#password'), 'mypassword').then(() => {
          click(find('button:contains(' + createAccountText + ')')).then(() => {
            assert.equal(find('p:contains("You must provide a password")').length, 0);
          });
        });
      });
    });
  });
});

test('Should show an error message when the user submits an empty password confirmation field', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), 'something@else.com');
    fillIn(find('input#password'), 'mycoolpass');
    click(find('button:contains(' + createAccountText + ')')).then(() => {
      assert.equal(find('p:contains("You must provide a confirmation password")').length, 1);
    });
  });
});

test('Should clear the error if the user corrects an empty password confirmation', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), 'something@aol.com');
    fillIn(find('input#password'), 'mycoolpass').then(() => {
      click(find('button:contains(' + createAccountText + ')')).then(() => {
        fillIn(find('input#repeat-password'), 'mypassword').then(() => {
          click(find('button:contains(' + createAccountText + ')')).then(() => {
            assert.equal(find('p:contains("You must provide a confirmation password")').length, 0);
          });
        });
      });
    });
  });
});

test('Should show an error message when the user submits a passwords that do not match', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), 'something@else.com');
    fillIn(find('input#password'), 'mycoolpass1');
    fillIn(find('input#repeat-password'), 'mycoolpass2');
    click(find('button:contains(' + createAccountText + ')')).then(() => {
      assert.equal(find('p:contains("Your passwords do not match")').length, 2);
    });
  });
});

test('Should clear the error if the user corrects an incorrect password error', (assert) => {
  click(find('#sign-up')).then(() => {
    fillIn(find('input#email'), 'something@aol.com');
    fillIn(find('input#password'), 'mycoolpass');
    fillIn(find('input#repeat-password'), 'mycoolpass2').then(() => {
      click(find('button:contains(' + createAccountText + ')')).then(() => {
        fillIn(find('input#repeat-password'), 'mycoolpass').then(() => {
          click(find('button:contains(' + createAccountText + ')')).then(() => {
            assert.equal(find('p:contains("Your passwords do not match")').length, 0);
          });
        });
      });
    });
  });
});

// test('Should show a button to connect to venmo when all forms are correctly filled out', (assert) => {
//   click(find('#sign-up')).then(() => {
//     fillIn(find('input#email'), 'something@else.com');
//     fillIn(find('input#password'), 'mycoolpass1');
//     fillIn(find('input#repeat-password'), 'mycoolpass1');
//     click(find('button:contains(' + createAccountText + ')')).then(() => {
//       assert.equal(find('button:contains("Connect to Venmo")').length, 1);
//     });
//   });
// });
