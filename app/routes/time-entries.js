import Ember from 'ember';
import startOfWeek from 'date-fns/start_of_week';
import lastDayOfWeek from 'date-fns/last_day_of_week';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import eachDay from 'date-fns/each_day';

export default Ember.Route.extend({
  inicioFecha: null,
  finFecha: null,
  queryParams: {
    start: { refreshModel: true },
    end: { refreshModel: true }
  },
  model(params) {
    if (params.start && params.end) {
      // Formato de inicioFecha y finFecha es YYYY-MM-DD
      this.set('inicioFecha', params.start);
      this.set('finFecha', params.end);
    } else {
      let hoy = new Date();
      this.set('inicioFecha', format(startOfWeek(hoy, { weekStartsOn: 1 }), 'YYYY-MM-DD'));
      this.set('finFecha', format(lastDayOfWeek(hoy, { weekStartsOn: 1 }), 'YYYY-MM-DD'));
    }

    return this.get('store').query('time_entry', {
      limit: 100,
      user_id: this.modelFor("application").get('id'),
      spent_on: '><' + this.get('inicioFecha') + '|' + this.get('finFecha')
    });
  },
  setupController(controller, model) {
    this._super(controller, model);

    controller.set('inicioFecha', parse(this.get('inicioFecha')));
    controller.set('finFecha', parse(this.get('finFecha')));
    controller.set('range', {
      start: this.get('inicioFecha'),
      end: this.get('finFecha')
    });
    controller.set('fechas', Ember.makeArray(
      eachDay(controller.get('inicioFecha'), controller.get('finFecha'))
      .map((day) => {
        return Ember.Object.create({ 'dia': day, 'total': 0 })
      })
    ));
    controller.set('timeEntries', this.get('store').peekAll('time-entry'));

    let promises = [];

    let tea = this.get('store').findAll('time-entry-activity').then(actividades => {
      controller.set('actividades', actividades);
    });
    promises.push(tea);

    let til = this.modelFor('application')
      .get('options')
      .get('timeIssuesList').then(issues => {
        issues.forEach(issue => {
          issue.timeEntriesFull(this.get('inicioFecha'), this.get('finFecha'))
        });
      });
    promises.push(til);

    controller.get('timeEntries').forEach(te => {
      let p = te.get('issue');
      promises.push(p);
    });

    return Ember.RSVP.Promise.all(promises).then(() => {
      controller.set('mentionedIssues', this.get('store').peekAll('issue'));
      controller.get('mentionedIssues').forEach(issue => {
        issue.timeEntriesFull(this.get('inicioFecha'), this.get('finFecha'));
      });
      let allIssues = Ember.makeArray();
      allIssues.addObjects(controller.get('mentionedIssues'));
      allIssues.addObjects(this.modelFor('application').get('options').get('timeIssuesList'));
      controller.set('allIssues', allIssues);
      controller.send('calcularTotales');
  });
  }
});
