import ProductConstants from './ProductConstants';

module.exports = {

  getProduct: function(id, resolve, reject) {
    let url = `/api/products/${id}`
    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve,
        error: reject
      });
    });
  }
};
