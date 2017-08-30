import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.attr(),
  issue: DS.attr(),
  user: DS.attr(),
  activity: DS.belongsTo('time-entry-activity', {async: true}),
  hours: DS.attr(),
  comments: DS.attr(),
  spentOn: DS.attr()
});
