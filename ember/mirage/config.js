import Mirage from 'ember-cli-mirage';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.post('/users/sign_in', (schema, request) => {
    let id = 1;
    let auth = true;
    if (request.requestBody.includes('faker')) {
      return new Mirage.Response(404, {some: 'header'}, {error: "That email and password combination is incorrect. Please try again."});
    } else if (request.requestBody.includes('newuser')) {
      id = 2; // will be an unauthorized user
      auth = false;
    }
    return {
      "accessToken" : "wahwahweewah",
      "userId" : id,
      "isVenmoAuthorized" : auth
    };
  });



  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  // this.get('/divvies', (schema) => {
  //   // let models = schema.divvies.all().models;
  //   // return {divvies: models};
  //   return schema.divvies.all();
  // });
  this.delete('/users/sign_out', () => {
    return {
      "userId" : 1
    };
  });

  this.get('/divvies/:id', (schema, request) => {
    let divvy = schema.divvies.find(request.params.id);
    let paymentIds = schema.payments.where({divvyId: divvy.id}).models.mapBy('id');
    let settlementIds = schema.settlements.where({divvyId: divvy.id}).models.mapBy('id');
    let userIds = schema.users.where({divvyId: divvy.id}).models.mapBy('id');
    return {
      divvy: {
        id: divvy.id,
        title: divvy.title,
        payments: paymentIds,
        settlements: settlementIds,
        users: userIds,
        organizer: divvy.organizer.id
      }
    };
  });

  this.get('divvies', (schema, request) => {
    let divvies = schema.divvies.all();
    var obj = {divvies: []};

    for (let div of divvies.models) {
      obj["divvies"].push({
        id: div.id,
        title: div.title,
        payments: div.payments.models.mapBy('id'),
        users: div.users.models.mapBy('id'),
        organizer: div.organizer.id
      });
    }
    return obj;
  });

  this.get('payments/:id', (schema, request) => {
    let payment = schema.payments.find(request.params.id);
    let user = schema.users.find(parseInt(payment.user.id));
    return {
      payment: {
        id: payment.id,
        amount: payment.amount,
        user: user.id
      }
    };
  });
  this.get('users/:id', (schema, request) => {
    let user = schema.users.find(request.params.id);
    let auth = false;
    if (user.id === '1') {
      auth = true;
    }
    return {
      user: {
        id: user.id,
        username: user.username,
        isVenmoAuthorized: auth
      }
    };
  });
  // FOLLOWING CONVENTION, SO CAN SUB ABOVE WITH BELOW
  this.post('divvies');
  this.get('settlements/:id');
  this.delete('payments/:id');
  this.delete('divvies/:id');

  this.put('payments/:id', (request) => {
    console.log(request); // for some reason there is an error unless this is done in long form.
  });

  this.post('payments', (schema, request) => {
    var params = JSON.parse(JSON.stringify(request.requestBody));

    if (request.requestBody.includes('error')) {
      return new Mirage.Response(500, {some: 'header'}, {error: "Something went wrong, please try again later."});
    }
    return schema.payments.create(params);
  });

  this.post('/users', (schema, request) => {
    var params = JSON.parse(JSON.stringify(request.requestBody));
    if (request.requestBody.includes('error')) {
      return new Mirage.Response(500, {some: 'header'}, {error: "Something you did caused something to break. Thanks a lot. Try again later."});
    }
    return schema.users.create(params);
  });



  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
