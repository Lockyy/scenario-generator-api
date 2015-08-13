import SearchConstants from './SearchConstants';

module.exports = {

  getSearchResults: _.debounce(function(data, resolve, reject) {
    let url = `/api/search`
    return new Promise(function() {
      $.ajax({
        url: url,
        data: data,
        success: resolve,
        error: reject
      });
    });
  }, 300)

};
