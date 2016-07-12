import Ember from "ember";
let $ = Ember.$;

export default Ember.Component.extend({

  store: Ember.inject.service(),

	actions: {
		createDivvy () {
			// clear any lingering form errors
			this.set('formError', undefined);

			let title = this.get('title');

			if (!title || title.length < 1 || $.trim(title) === "") {
				this.set('formError', 'Title field cannot be empty');
				return;
			} else {
				let divvy = this.get('store').createRecord('divvy', {
					title: title
				});
				divvy.save().then(divvy => {
					this.sendAction('flash', 'New divvy successfully created', 'success');
					this.sendAction('transition', divvy);
				}, error => {
					if (error.responseJSON && error.responseJSON.error) {
						this.sendAction('flash', error.responseJSON.error, 'warning');
					} else {
						this.sendAction('flash', 'An error occurred while processing your request', 'warning');
					}
				});
			}
		}
	}
});
