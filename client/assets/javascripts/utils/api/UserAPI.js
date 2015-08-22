import _ from 'lodash';
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
  },

  getUser: function getUser(id, resolve, reject) {
    let url = _.template(UserConstants.USER_URL)({ userId: id });

    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve
      });
    });
  },

  getUserRecentActivity(id, paginationParams, resolve, reject) {
    //TODO
    let url = _.template(UserConstants.USER_URL)({ userId: id });

    return new Promise(function() {
      // $.ajax({
      //   url: url,
      //   success: resolve
      // });
      setTimeout(function() {
        resolve([]);
      }, 500)
    });
  }
};
