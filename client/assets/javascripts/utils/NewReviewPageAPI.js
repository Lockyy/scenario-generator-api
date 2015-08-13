import NewReviewPageConstants from './constants/NewReviewPageConstants';

module.exports = {
  submit: function(data, resolve, reject) {
    let product_id = data.review && data.review.product ? data.review.product.id : null;
    let url = product_id ?
      _.template(NewReviewPageConstants.NESTED_CREATE_URL)({ 'product_id' : product_id }) :
      NewReviewPageConstants.CREATE_URL;

    return new Promise(function() {
      $.ajax({
        url: url,
        method: 'POST',
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
  }
};
