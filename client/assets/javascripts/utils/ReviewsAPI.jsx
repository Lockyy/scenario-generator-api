import ProductConstants from './ProductConstants';

module.exports = {
  getReviews: function(productID, resolve, reject) {
    if(productID) {
      let url = `/api/products/${productID}/reviews`
      return new Promise(function() {
        $.ajax({
          url: url,
          success: resolve
        });
      });
    }
  }
};
