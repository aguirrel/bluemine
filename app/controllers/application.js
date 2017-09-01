import Ember from 'ember';

export default Ember.Controller.extend({
  getUser() {
    return this.get('model');
  }
});
