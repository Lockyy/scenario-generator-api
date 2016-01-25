import CompanyConstants from '../constants/CompanyConstants';
import { Promise } from 'es6-promise';

module.exports = {
  getData: function(id, resolve, reject) {
    let url = `${CompanyConstants.COMPANY_URL}${id}`
    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve,
        error: reject
      });
    });
  },

  updateTags(id, tags, resolve, reject) {
    let url = _.template(CompanyConstants.COMPANY_TAGS_UPDATE_URL)({id: id});

    return new Promise(function() {
      $.ajax({
        url: url,
        data:  JSON.stringify({tags: tags}),
        method: 'PATCH',
        dataType: 'json',
        contentType: 'application/json',
        success: resolve,
        error: reject
      });
    });
  }
};
