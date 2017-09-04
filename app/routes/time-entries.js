import Ember from 'ember';
import startOfWeek from 'date-fns/start_of_week';
import lastDayOfWeek from 'date-fns/last_day_of_week';
import format from 'date-fns/format'

export default Ember.Route.extend({
  model() {
    let hoy = new Date();
    let inicioSemana= format(startOfWeek(hoy,  {weekStartsOn: 1}), 'YYYY-MM-DD');
    let finSemana= format(lastDayOfWeek(hoy,  {weekStartsOn: 1}), 'YYYY-MM-DD');

    return this.get('store').query('time_entry', {
      user_id: this.modelFor("application").get('id'),
      spent_on: '><'+inicioSemana+'|'+finSemana});
  }
});
