import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'http://redmine',
    namespace: '',
    buildURL: function(record, suffix) {
        return this._super(record, suffix) + '.json';
    },
    pathForType: function(type) {
      let ptype = this._super(...arguments);
      console.log(ptype);
      return Ember.String.underscore(ptype);
    },
    ajaxOptions(url, type, options) {
      var hash = options || {};
      hash.url = url;
      hash.type = type;
      hash.dataType = 'jsonp';
      hash.context = this;

      if (hash.data && type !== 'GET') {
        hash.contentType = 'application/javascript; charset=utf-8';
        hash.data = JSON.stringify(hash.data);
      }

      var headers = Ember.get(this, 'headers');
      if (headers !== undefined) {
        hash.beforeSend = function (xhr) {
          Object.keys(headers).forEach((key) =>  xhr.setRequestHeader(key, headers[key]));
        };
      }

      return hash;
    }
});
