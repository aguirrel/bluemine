import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  searchSelectedIssues: Ember.makeArray(),
  showIssueSearch: false,
  selectedItem: null,
  totalHoras: Ember.observer('timeEntries.@each.hours', () => {
    console.log("D");
    Ember.run.schedule("afterRender", this, function() {
      console.log(this);
      //this.send("calcularTotales");
    });
  }),
  actions: {
    closeIssueSearch(text) {
      if (text === 'ok') {
        //this.get('searchSelectedIssues').forEach(issue => console.log(issue.get('subject')));
        this.get('searchSelectedIssues').forEach(issue => {
          issue.timeEntriesFull(this.get('inicioFecha'), this.get('finFecha'));
        });
        this.set('timeEntries', this.get('store').peekAll('time-entry'));
        this.get('application.model.options').then(userOptions => {
          userOptions.get('timeIssuesList').addObjects(this.get('searchSelectedIssues'))
          userOptions.save();
          this.get('searchSelectedIssues').setObjects([]);
        });
      }
    },
    calcularTotales() {
      this.get('fechas').forEach(f => f.set('total', 0));
      this.get('application.model.options.timeIssuesList').forEach(issue => {
        issue.get('timeEntriesSorted').forEach((te, idx) => {
          this.get('fechas').objectAt(idx).incrementProperty('total', Number(te.get('hours')))
        })
      })
    },
    deleteFromOptions(issue) {
      this.get('application.model.options').then(options => {
        if (options.get('timeIssuesList').indexOf(issue) != -1) {
          options.get('timeIssuesList').removeObject(issue);
          options.save();
        }
      });
    },
    saveTimeEntry(te) {

    }
  }
});
