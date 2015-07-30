import DashboardConstants from './DashboardConstants';

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
