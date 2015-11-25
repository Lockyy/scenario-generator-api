import { Promise } from 'es6-promise';

module.exports = {

  createCollection: function(data, resolve, reject) {
    let url = `/api/collections`;
    return this.hitAPI(url, 'post', data, resolve, reject);
  },

  addProductToCollection: function(product_id, collection_id, resolve, reject) {
    let url = `/api/collections/${collection_id}/add_product`;
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

  shareCollection: function(id, users, resolve, reject) {
    let url = `/api/collections/${id}/share`;
    return this.hitAPI(url, 'post', {users: users}, resolve, reject);
  },

  updateCollection: function(id, data, resolve, reject) {
    let url = `/api/collections/${id}`;
    return this.hitAPI(url, 'patch', data, resolve, reject);
  },

  deleteCollection: function(id, resolve, reject) {
    let url = `/api/collections/${id}`;
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

};