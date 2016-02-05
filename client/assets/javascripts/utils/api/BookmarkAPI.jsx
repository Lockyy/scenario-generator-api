import { Promise } from 'es6-promise';

module.exports = {

  fetchBookmarkedProducts: function(resolve, reject) {
    let url = `/api/v1/bookmarks`
    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve,
        error: reject
      });
    });
  },

  createBookmark: function(id, resolve, reject) {
    let url = `/api/v1/products/${id}/bookmark`
    return new Promise(function() {
      $.ajax({
        url: url,
        method: 'post',
        success: resolve,
        error: reject
      });
    });
  },

  deleteBookmark: function(id, resolve, reject) {
    let url = `/api/v1/products/${id}/bookmark`
    return new Promise(function() {
      $.ajax({
        url: url,
        method: 'delete',
        success: resolve,
        error: reject
      });
    });
  }

};
