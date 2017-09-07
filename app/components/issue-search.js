import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  isIssuesLoading: false,
  searchTextIssue() {

    if (!this.get('textoSearch')) {
      return;
    }

    let store = this.get('store');
    let searchText = this.get('textoSearch');
    this.set('isIssuesLoading', true);
    if (parseInt(searchText)) {
      store.findRecord('issue', searchText)
        .then(data => this.set('issues', Ember.makeArray([data])))
        .then(() => this.set('isIssuesLoading', false));
    } else {
      store.query('issue', {
          'f[]': 'subject',
          'op[subject]': '~',
          'v[subject][]': searchText
        })
        .then(data => this.set('issues', data))
        .then(() => this.set('isIssuesLoading', false));
    }
  },
  actions: {
    closePromptDialog(text) {
      this.attrs.closePromptDialog(text);
      this.set('textoSearch', '');
      this.get('selectedIssues').forEach(issue => issue.set('checked', false));
      this.set('issues', []);
      this.set('showDialog', false);
    },
    searchText() {
      Ember.run.debounce(this, this.searchTextIssue, 1000);
    },
    updateSelected(selectedIssue) {
      if (selectedIssue.get('checked'))
        this.get('selectedIssues').addObject(selectedIssue)
      else
        this.get('selectedIssues').removeObject(selectedIssue);

    }
  }
});
