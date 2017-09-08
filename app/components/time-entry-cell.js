import Ember from 'ember';

export default Ember.Component.extend({
  isInvalidAndTouched: Ember.observer('validationErrorMessages.@each', function() {
    return this.get('validationErrorMessages.length');
  }),
  validationErrorMessages: [],
  saveModel() {
    this.set('validationErrorMessages', []);
    if (isNaN(this.get('model.hours'))) {
      this.set('validationErrorMessages', ['Las horas deben ser numeros']);
      return;
    } else if (!this.get('model.activity.id')) {
      this.set('validationErrorMessages', ['La actividad no puede estar vacia']);
      return;
    }
    return this.get('model').save().catch((error) => {
      if(error.name === "SyntaxError" && error.message === 'Unexpected end of JSON input')
      {
        this.set('validationErrorMessages', []);
      }
      else {
         this.set('validationErrorMessages', ['Error al guardar, rollback']);
         this.get('model').rollbackAttributes();
      }
    });
  },
  actions: {
    saveTimeEntry() {
      Ember.run.debounce(this, this.saveModel, 1000);
    }
  }
});
