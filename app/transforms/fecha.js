import DS from 'ember-data';
import format from 'date-fns/format'
import parse from 'date-fns/parse'

export default DS.Transform.extend({
  deserialize(serialized) {
    return parse(serialized);
  },

  serialize(deserialized) {
    return deserialized ? format(deserialized, "YYYY-MM-DD") : null;
  }
});
