import Ember from 'ember';
import flashObject from '../objects/flash';

export default Ember.Route.extend({

	actions : {
		flashMessage (message, type) {
			var flashMessage = flashObject.create({
				message: message,
				type: type
			});
			this.controllerFor('application').get('flashArray').pushObject(flashMessage);
		},
		invalidateSession () {
			this.get('session').invalidate().then(() => {
				this.send('flashMessage', 'Successfully logged out', 'notice');
			});
		}
	}
});
