import DashboardConstants from './DashboardConstants';

module.exports = {

  // Load mock product data from localStorage into ProductStore via Action
  getData: function(paginationParams, resolve, reject) {
    return new Promise(function() {
      $.ajax({
        url: DashboardConstants.DASHBOARD_URL,
        success: resolve
      });
    });
  }
};