import _ from 'lodash';

module.exports = {
  addProtocol: function(url) {
    return (_.isEmpty(url) || new RegExp("^[http(s)|ftp]://").test(url)) ? url : `http://${url}`;
  }
};
