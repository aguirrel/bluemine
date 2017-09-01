import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('project', { async: true }),
  issue: DS.belongsTo('issue', { async: true }),
  user: DS.belongsTo('user', { async: true }),
  activity: DS.belongsTo('time-entry-activity', { async: true }),
  hours: DS.attr(),
  comments: DS.attr(),
  spentOn: DS.attr()
});
