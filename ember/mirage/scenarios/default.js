export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */
  let divvyNumber = 10;
  let divvies = server.createList('divvy', divvyNumber);

  // create a payment for each divvy
  for (let i = 1; i < divvyNumber + 1; i++) {
    for (let j = 1; j < 4 + 1; j++) {
      let user = server.create('user', { divvy: server.schema.divvies.find(i) });
      server.create('payment', { divvy: server.schema.divvies.find(i), user: user, amount: j });
    }

    let div = server.schema.divvies.find(i);
    let organizer = server.schema.users.find(1); // for testing, want to make one divvy where currentUser is organizer
    if (i !== 1) {
      organizer = div.users.models[i % 3];
    }
    div.update('organizer', organizer);
  }

  for (let divvy of divvies) {
    if (divvy.id < 6) {
      let payerId = Math.floor((Math.random() * divvyNumber) + 1);
      let payeeId = Math.floor((Math.random() * divvyNumber) + 1);
      let payer = server.schema.users.find(payerId);
      let payee = server.schema.users.find(payeeId);
      server.createList('settlement', 4, {divvy, payer, payee});
    }
  }
}
