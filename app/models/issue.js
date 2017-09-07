import DS from 'ember-data';
import eachDay from 'date-fns/each_day';
import Ember from 'ember';
import compareAsc from 'date-fns/compare_asc'

export default DS.Model.extend({
  subject: DS.attr(),
  timeEntries: DS.hasMany('time-entry'),
  timeEntriesSorted: Ember.computed.sort('timeEntries', function(item1, item2) {
    return compareAsc(item1.get('spentOn'), item2.get('spentOn'));
  }),
  timeEntriesFull(fechaInicio, fechaFin) {
    let fechas = eachDay(fechaInicio, fechaFin);
    fechas.forEach(fecha => {
      if (this.get('timeEntries').map((te) => Number(te.get('spentOn'))).indexOf(+fecha) == -1) {
        this.get('store').createRecord('time-entry', { 'spentOn': fecha, issue: this, hours: 0 });
      }
    })
  }
});
