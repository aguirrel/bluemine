import DS from 'ember-data';

export default DS.Model.extend({
  projectId: DS.attr(),
  issueId: DS.attr(),
  userId: DS.attr(),
  activityId: DS.attr(),
  hours: DS.attr(),
  comments: DS.attr(),
  spentOn: DS.attr()
});
