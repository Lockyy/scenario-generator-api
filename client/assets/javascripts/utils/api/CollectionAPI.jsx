import { Promise } from 'es6-promise';

module.exports = {

  createCollection: function(data, resolve, reject) {
    let url = `/api/collections`;
    return this.hitAPI(url, 'post', data, resolve, reject);
  },

  addProductToCollection: function(product_id, collection_id, resolve, reject) {
    let url = `/api/collections/${collection_id}/products`;
    return this.hitAPI(url, 'post', {product: product_id}, resolve, reject);
  },

  fetchCollection: function(id, resolve, reject) {
    let url = `/api/collections/${id}`;
    return this.hitAPI(url, 'get', {}, resolve, reject);
  },

  performSearch: _.debounce(function(searchTerm, resolve, reject) {
    let url = `/api/search/collections`;
    return this.hitAPI(url, 'get', {search_string: searchTerm}, resolve, reject);
  }, 300),

  shareCollection: function(id, data, resolve, reject) {
    let url = `/api/collections/${id}/share`;
    return this.hitAPIJSON(url, 'post', data, resolve, reject);
  },

  updateCollection: function(id, data, resolve, reject) {
    let url = `/api/collections/${id}`;
    return this.hitAPI(url, 'patch', data, resolve, reject);
  },

  deleteProduct: function(id, product_id, resolve, reject) {
    let url = `/api/collections/${id}/products/${product_id}`;
    return this.hitAPI(url, 'delete', {}, resolve, reject);
  },

  deleteCollection: function(id, resolve, reject) {
    let url = `/api/collections/${id}`;
    return this.hitAPI(url, 'delete', {}, resolve, reject);
  },

  leaveCollection: function(id, resolve, reject) {
    let url = `/api/collections/${id}/leave`
    return this.hitAPI(url, 'delete', {}, resolve, reject);
  },

  hitAPI: function(url, method, data, resolve, reject) {
    return new Promise(function() {
      $.ajax({
        url: url,
        data: data,
        method: method,
        success: resolve,
        error: reject
      });
    });
  },

  hitAPIJSON: function(url, method, data, resolve, reject) {
    return new Promise(function() {
      $.ajax({
        url: url,
        data: JSON.stringify(data),
        method: method,
        success: resolve,
        contentType: 'application/json',
        error: reject
      });
    });
  },

};