import Ember from 'ember';
import format from 'date-fns/format';
import isWeekend from 'date-fns/is_weekend';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  searchSelectedIssues: Ember.makeArray(),
  showIssueSearch: false,
  selectedItem: null,
  totalHoras: Ember.observer('timeEntries.@each.hours', function() {
    this.send("calcularTotales");
  }),
  hoursPerDayObserver: Ember.observer('application.model.options.hoursPerDay', function() {
    this.get('application.model.options').then(o => o.save());
  }),
  rangeObserver: Ember.observer('range', function() {
    let range = this.get('range');

    if (range.start && range.end) {
      this.transitionToRoute({
        queryParams: {
          start: format(range.start, 'YYYY-MM-DD'),
          end: format(range.end, 'YYYY-MM-DD')
        }
      });
    }
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
      if(!this.get('allIssues')) return;
      this.get('allIssues').forEach(issue => {
        issue.get('timeEntriesSorted').filter((item) => {
          return this.get('inicioFecha') <= item.get('spentOn') && item.get('spentOn') <= this.get('finFecha');
        }).forEach((te, idx) => {
          let f=this.get('fechas').objectAt(idx);

          f.incrementProperty('total', Number(te.get('hours')));
          if(isWeekend(f.get('dia')))
          {
            if(f.get('total'))
              f.set('status', 'weekend-hours');
            else
              f.set('status', 'ok-hours');
          }
          else {
            if(f.get('total') < this.get('application.model.options.hoursPerDay'))
              f.set('status', 'less-hours');
            else if(f.get('total') > this.get('application.model.options.hoursPerDay'))
              f.set('status', 'more-hours');
            else
              f.set('status', 'ok-hours');
          }
        });
      });
    },
    deleteFromOptions(issue) {
      this.get('application.model.options').then(options => {
        if (options.get('timeIssuesList').indexOf(issue) != -1) {
          options.get('timeIssuesList').removeObject(issue);
          options.save();
        }
      });
    }
  }
});
