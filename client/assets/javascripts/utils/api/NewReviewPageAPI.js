import NewReviewPageConstants from '../constants/NewReviewPageConstants';
import { Promise } from 'es6-promise';

module.exports = {
  submit: function(data, resolve, reject) {
    let review_id = data.review ? data.review.id : null;
    let product_id = data.review && data.review.product ? data.review.product.id : null;
    let url = product_id ?
      _.template(NewReviewPageConstants.NESTED_CREATE_URL)({ 'product_id' : product_id, 'review_id': data.review.id }) :
      NewReviewPageConstants.CREATE_URL;
    let method = (review_id ? 'PUT' : 'POST');


    return new Promise(function() {
      $.ajax({
        url: url,
        method: method,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: resolve,
        error: reject
      })
    });
  },

  getSignedUploadUrl: function getSignedUploadUrl(file) {
    return $.ajax({
      url:      NewReviewPageConstants.CREATE_UPLOAD_URL,
      method:     'POST',
      dataType: 'json',
      data: {
        upload: { filename: file.name }
      }
    });
  },

  fetchReview: function fetchReview(productId, reviewId, resolve, reject) {
    let url = `/api/v1/products/${productId}/reviews/${reviewId}`

    return new Promise(function() {
      $.ajax({
        url: url,
        success: resolve,
        error: reject
      });
    });
  }
};
