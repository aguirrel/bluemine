import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  timeIssuesList: DS.hasMany('issue', { inverse: null }),
  hoursPerDay: DS.attr('number')
});
