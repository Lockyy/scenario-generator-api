import _ from 'lodash';

module.exports = {
  truncate: function(text, size) {
    return _.trunc(text, {length: size || 200, separator: ',? +'})
  }
};
