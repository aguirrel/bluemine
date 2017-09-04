import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  timesByIssue: groupBy('model', 'issue.id'),
  selectedItem: null,
  searchIssue(text) {
    this.store.query('issue', {
      'f[]': 'subject',
      'op[subject]': '~',
      'v[subject][]': text})
    .then(issues => {
        this.set('arrayOfItems', issues);
    });
  },
  actions: {
    issueSearchTextAction(text) {
      Ember.run.debounce(this, this.searchIssue(text), 2000);
    }
  }
});
