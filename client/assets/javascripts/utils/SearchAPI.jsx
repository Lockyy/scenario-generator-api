import SearchConstants from './SearchConstants';

module.exports = {

  getSearchResults: function(searchString, page, resolve, reject) {
    if(searchString) {
      let url = `/api/search`
      return new Promise(function() {
        $.ajax({
          url: url,
          data: { search: searchString, page: page, per_page: SearchConstants.PER_PAGE },
          success: resolve
        });
      });
    }
  }
};

