import _ from 'lodash';
import RegexConstants from '../constants/RegexConstants'

module.exports = {
  isImage: function(file_name) {
    return RegexConstants.IMAGE_EXTENSION.test(file_name);
  }
};
