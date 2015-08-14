import UserConstants from '../constants/UserConstants';
import { Promise } from 'es6-promise';

module.exports = {
  getCurrentUser: function(resolve, reject) {
    let url = UserConstants.CURRENT_USER_URL;

    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve
      });
    });
  }
};
