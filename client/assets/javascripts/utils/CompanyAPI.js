import CompanyConstants from './CompanyConstants';
import { Promise } from 'es6-promise';

module.exports = {
  getData: function(params, resolve, reject) {
    let url = CompanyConstants.COMPANY_URL + "/" + params.companyId
    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve
      });
    });
  }
};
