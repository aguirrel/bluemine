import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPIAdapter.extend({
    host: '',
    namespace: 'api',
    enumerations: ['time-entry-activity'],
    headers: {
        'Content-Type': 'application/json'
    },
    buildURL: function(record, suffix) {
      if (this.get('enumerations').includes(record)) {
          suffix = null;
      }
      return this._super(record, suffix) + '.json';
    },
    pathForType: function(type) {
      let ptype = this._super(...arguments);
      if (this.get('enumerations').includes(type))
      {
          ptype = 'enumerations/' + ptype;
      }
      return Ember.String.underscore(ptype);
    },
    ajaxOptions: function(url, type, options) {
      var hash = this._super(...arguments);
      //hash.dataType = "jsonp";
      return hash;
    }
});
