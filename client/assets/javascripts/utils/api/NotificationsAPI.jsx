import { Promise } from 'es6-promise';

module.exports = {

  fetchNotifications: function(resolve, reject) {
    let url = `/api/notifications`
    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve,
        error: reject
      });
    });
  }
};
