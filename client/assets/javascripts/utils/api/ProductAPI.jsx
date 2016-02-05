import ProductConstants from '../constants/ProductConstants';
import { Promise } from 'es6-promise';

module.exports = {

  getProduct: function(id, resolve, reject) {
    let url = `/api/v1/products/${id}`
    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve,
        error: reject
      });
    });
  }
};
