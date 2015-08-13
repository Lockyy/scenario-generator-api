import _ from 'lodash';
import RegexConstants from '../constants/RegexConstants'

module.exports = {
  addProtocol: function(url) {
    return (_.isEmpty(url) || new RegExp(RegexConstants.URL_PROTOCOL).test(url)) ? url : `http://${url}`;
  }
};
