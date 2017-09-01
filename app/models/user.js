import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr(),
  firstname: DS.attr(),
  lastname: DS.attr(),
  mail: DS.attr(),
  options: DS.belongsTo('user-options')
});
