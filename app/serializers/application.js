import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
    keyForAttribute: function(attr) {
        return Ember.String.underscore(attr);
    },
    payloadKeyFromModelName(modelName) {
       return Ember.String.underscore(modelName);
    },
    normalizeArrayResponse(store, primaryModelClass, payload) {
        payload.meta = { 
            'total_count': payload.total_count,
            'offset': payload.offset,
            'limit': payload.limit
        };
        delete payload.total_count;
        delete payload.offset;
        delete payload.limit;
        return this._super(...arguments);
    },
    normalize(modelClass, resourceHash, prop) {
        Object.entries(resourceHash).forEach( h => {
            if( h[1] instanceof Object && h[1].id)
            {
                resourceHash[ h[0] ] = h[1].id
            }
        });
        return this._super(...arguments);
    },
    keyForRelationship(key, typeClass, method)
    {
        if(method == 'serialize')
        {
            if(typeClass == 'belongsTo')
            {
                key = key + '_id';
            }
        }
        return key;

    }
});
