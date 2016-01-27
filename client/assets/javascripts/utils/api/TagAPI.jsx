import { Promise } from 'es6-promise';

module.exports = {

  getTags: function(resolve, reject) {
    let url = `/api/v1/tags`
    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve,
        error: reject
      });
    });
  },

  getProducts: function(tag, page, sorting, resolve, reject) {
    let url = `/api/v1/tag/${tag}/products`

    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve,
        error: reject,
        data: { page: page, sorting: sorting }
      });
    });
  },

  follow: function(tag, resolve, reject) {
    let url = `/api/v1/tag/${tag}/follow`
    return new Promise(function() {
      $.ajax({
        method: 'post',
        url: url,
        success: resolve,
        error: reject
      });
    });
  },

  unfollow: function(tag, resolve, reject) {
    let url = `/api/v1/tag/${tag}/unfollow`
    return new Promise(function() {
      $.ajax({
        method: 'post',
        url: url,
        success: resolve,
        error: reject
      });
    });
  },
};
