import DashboardData from './DashboardData';

module.exports = {

  // Load mock product data from localStorage into ProductStore via Action
  getData: function(paginationParams, resolve, reject) {
    return new Promise(function() {
      setTimeout(function() {
        let data = JSON.parse(DashboardData.fetch(paginationParams));
        resolve(data);
      });
    });
  }
};