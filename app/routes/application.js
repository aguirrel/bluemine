import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findRecord('user', 'current');
  },
  afterModel(resolvedModel, transition) {
    return this.get('store').findAll('user-options').then(() => {
      resolvedModel.get('options').then(uo => {
        if (!uo) this.get('store').createRecord('user-options', { user: resolvedModel }).save();
      })
    })
  }
});
