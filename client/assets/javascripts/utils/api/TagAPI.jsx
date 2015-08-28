import ProductConstants from '../constants/ProductConstants';
import { Promise } from 'es6-promise';

module.exports = {

  getProducts: function(tag, page, sort_by, resolve, reject) {
    let url = `/api/tags/${tag}`
    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve,
        error: reject,
        data: { page: page, sort_by: sort_by }
      });
    });
  },

  follow: function(tag, resolve, reject) {
    let url = `/api/tags/${tag}/follow`
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
    let url = `/api/tags/${tag}/unfollow`
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
