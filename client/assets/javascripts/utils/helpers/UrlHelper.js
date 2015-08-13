import _ from 'lodash';
import RegexConstants from '../constants/RegexConstants'

module.exports = {
  addProtocol: function(url) {
    debugger;
    return (_.isEmpty(url) || new RegExp(RegexConstants.URL_PROTOCOL).test(url)) ? url : `http://${url}`;
  }
};
