import { Promise } from 'es6-promise';

module.exports = {

  createCollection: function(data, resolve, reject) {
    let url = `/api/collections`;
    return this.hitAPI(url, 'post', data, resolve, reject);
  }

  fetchCollection: function(resolve, reject) {
    let url = `/api/collections/${id}`;
    return this.hitAPI(url, 'get', {}, resolve, reject);
  }

  updateCollection: function(data, resolve, reject) {
    let url = `/api/collections/${id}`;
    return this.hitAPI(url, 'patch', data, resolve, reject);
  }

  destroyCollection: function(id, resolve, reject) {
    let url = `/api/collections/${id}`;
    return this.hitAPI(url, 'delete', {}, resolve, reject);
  }

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