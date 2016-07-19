export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */
  let divvyNumber = 10;
  server.createList('divvy', divvyNumber);

  // create a payment for each divvy
  for (let i = 1; i < divvyNumber + 1; i++) {
    for (let j = 1; j < 4 + 1; j++) {
      let user = server.create('user', { divvy: server.schema.divvies.find(i) });
      server.create('payment', { divvy: server.schema.divvies.find(i), user: user, amount: j });
    }
  }
}
