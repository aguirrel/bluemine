import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').query('time_entry', {
      user_id: this.modelFor("application").get('id'),
      spent_on: '><2017-08-27|2017-08-31' });
  }
});
