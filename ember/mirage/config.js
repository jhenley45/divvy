export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/divvies', (schema) => {
    let models = schema.divvies.all().models;
    return {divvies: models};
  });

  this.post('/divvies', (schema, request) => {
    // don't want to override any existing ids, just dynamically add 1 to however many are in db already
    let id = schema.divvies.all().models.length + 1;
    return {
      divvy: {id: id, title: JSON.parse(request.requestBody).divvy.title},
    };
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
