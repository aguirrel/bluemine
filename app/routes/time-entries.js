import Ember from 'ember';
import startOfWeek from 'date-fns/start_of_week';
import lastDayOfWeek from 'date-fns/last_day_of_week';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import eachDay from 'date-fns/each_day';

export default Ember.Route.extend({
  inicioFecha: null,
  finFecha: null,
  model() {
    let hoy = new Date();
    this.set('inicioFecha', format(startOfWeek(hoy, { weekStartsOn: 1 }), 'YYYY-MM-DD'));
    this.set('finFecha', format(lastDayOfWeek(hoy, { weekStartsOn: 1 }), 'YYYY-MM-DD'));
    return this.get('store').query('time_entry', {
      user_id: this.modelFor("application").get('id'),
      spent_on: '><' + this.get('inicioFecha') + '|' + this.get('finFecha')
    });
  },
  afterModel(resolvedModel, transition) {
    this.modelFor('application')
      .get('options')
      .get('timeIssuesList').forEach(issue => {
        issue.timeEntriesFull(this.get('inicioFecha'), this.get('finFecha'))
      });
  },
  setupController(controller, model) {
    controller.set('inicioFecha', parse(this.get('inicioFecha')));
    controller.set('finFecha', parse(this.get('finFecha')));
    controller.set('fechas', Ember.makeArray(
      eachDay(controller.get('inicioFecha'), controller.get('finFecha'))
      .map((day) => {
        return Ember.Object.create({ 'dia': day, 'total': 0 })
      })
    ));
    controller.set('timeEntries', this.get('store').peekAll('time-entry'));
    return this.get('store').findAll('time-entry-activity').then(actividades => {
      controller.set('actividades', actividades);
    });
  }
});
