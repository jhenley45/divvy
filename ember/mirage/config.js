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
    let payments = divvy.payments.models;
    let settlements = divvy.settlements.models;
    let users = divvy.users.models;
    let id = 1;
    if (divvy.organizer) {
      id = divvy.organizer.id;
    }
    let settleArray = [];
    for (let settlement of settlements) {
      let obj = {};
      obj["id"] = settlement.id;
      obj["amount"] = settlement.amount;
      obj["divvy"] = settlement.divvyId;
      obj["payer"] = settlement.payerId;
      obj["payee"] = settlement.payeeId;
      settleArray.push(obj);
    }

    let userArray = [];
    for (let user of users) {
      let obj = {};
      obj["id"] = user.id;
      obj["username"] = user.username;
      obj["divvy"] = user.divvyId;
      obj["credits"] = user.credits.models.mapBy('id');
      obj["debts"] = user.debts.models.mapBy('id');
      userArray.push(obj);
    }

    let paymentArray = [];
    for (let payment of payments) {
      let obj = {};
      obj["id"] = payment.id;
      obj["description"] = payment.description;
      obj["amount"] = payment.amount;
      obj["divvy"] = payment.divvyId;
      obj["user"] = payment.userId;
      paymentArray.push(obj);
    }

    return {
      divvy: {
        id: divvy.id,
        title: divvy.title,
        payments: payments.mapBy('id'),
        settlements: settlements.mapBy('id'),
        users: users.mapBy('id'),
        organizer: id
      },
      settlements: settleArray,
      users: userArray,
      payments: paymentArray
    };
  });

  this.get('divvies', (schema) => {
    let divvies = schema.divvies.all();
    var obj = {divvies: []};

    for (let div of divvies.models) {
      let id = 1;
      if (div.organizer) {
        id = div.organizer.id;
      }
      obj["divvies"].push({
        id: div.id,
        title: div.title,
        payments: div.payments.models.mapBy('id'),
        users: div.users.models.mapBy('id'),
        settlements: div.settlements.models.mapBy('id'),
        organizer: id
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
        user: user.id,
        description: payment.description
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
  this.get('settlements/:id', (schema, request) => {
    let settlement = schema.settlements.find(request.params.id);
    return {
      settlement: {
        id: settlement.id,
        amount: settlement.amount,
        divvy: settlement.divvyId,
        payer: settlement.payerId,
        payee: settlement.payeeId
      }
    };
  });

  // FOLLOWING CONVENTION, SO CAN SUB ABOVE WITH BELOW
  this.post('divvies');
  this.delete('payments/:id');
  this.delete('divvies/:id');
  this.put('/divvies/:id', (request) => {
    console.log(request); // for some reason there is an error unless this is done in long form.
  });

  this.put('payments/:id', (request) => {
    console.log(request); // for some reason there is an error unless this is done in long form.
  });

  this.put('users/:id', (request) => {
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

  this.get('users', (schema) => {
    let users = schema.users.all();

    let userArray = [];
    for (let user of users.models) {
      let obj = {};
      obj["id"] = user.id;
      obj["username"] = user.username;
      obj["divvy"] = user.divvyId;
      obj["credits"] = user.credits.models.mapBy('id');
      obj["debts"] = user.debts.models.mapBy('id');
      userArray.push(obj);
    }

    return { users: userArray };
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
