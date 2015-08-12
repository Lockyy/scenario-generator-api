module.exports = {
  getSearchResults: function(searchString, resolve, reject) {
    if(searchString) {
      let url = `/api/search`
      return new Promise(function() {
        $.ajax({
          url: url,
          data: { search: searchString },
          success: resolve
        });
      });
    }
  }
};
