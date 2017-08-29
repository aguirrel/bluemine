import DS from 'ember-data';

export default DS.Model.extend({
  projectId: DS.attr(),
  issueId: DS.attr(),
  userId: DS.attr(),
  activitId: DS.attr(),
  hours: DS.attr(),
  comments: DS.attr(),
  spent_on: DS.attr()
});
