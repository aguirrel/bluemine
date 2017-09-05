import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  searchTextIssue() {
    console.log("LALALA");
    this.get('store').query('issue', {
      'f[]': 'subject',
      'op[subject]': '~',
      'v[subject][]': this.get('textoSearch')})
    .then(issues => {
      console.log(issues);
        //this.set('arrayOfItems', issues);
    });
  },
  actions: {
    closePromptDialog(issues) {
      this.attrs.closePromptDialog(issues);
      this.set('showDialog', false);
    },
    searchText() {
      Ember.run.debounce(this, this.searchTextIssue, 1000);
    }
  }
});
