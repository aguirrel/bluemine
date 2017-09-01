import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  timesByIssue: groupBy('model', 'issue.id')
});
