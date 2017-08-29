import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPIAdapter.extend({
    host: '',
    namespace: 'api',
    headers: {
        'Content-Type': 'application/json'
    },
    buildURL: function(record, suffix) {
        return this._super(record, suffix) + '.json';
    },
    pathForType: function(type) {
      let ptype = this._super(...arguments);
      console.log(ptype);
      return Ember.String.underscore(ptype);
    },
    ajaxOptions: function(url, type, options) {
      var hash = this._super(...arguments);
      //hash.dataType = "jsonp";
      return hash;
    }
});
