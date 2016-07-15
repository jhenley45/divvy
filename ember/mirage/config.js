export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  // this.get('/divvies', (schema) => {
  //   // let models = schema.divvies.all().models;
  //   // return {divvies: models};
  //   return schema.divvies.all();
  // });
  this.get('/divvies/:id', (schema, request) => {
    let divvy = schema.divvies.find(request.params.id);
    let paymentIds = schema.payments.where({divvyId: divvy.id}).models.mapBy('id');
    return {
      divvy: {
        id: divvy.id,
        title: divvy.title,
        payments: paymentIds
      }
    };
  });
  // FOLLOWING CONVENTION, SO CAN SUB ABOVE WITH BELOW
  this.get('divvies');
  // this.get('divvies/:id');
  this.post('divvies');
  this.get('payments/:id');



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
