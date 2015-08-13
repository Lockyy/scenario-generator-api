import DashboardConstants from './DashboardConstants';
import { Promise } from 'es6-promise';

module.exports = {

  getData: function(paginationParams, resolve, reject) {
    return new Promise(function() {
      $.ajax({
        url: DashboardConstants.DASHBOARD_URL,
        data: paginationParams,
        success: resolve
      });
    });
  }
};
