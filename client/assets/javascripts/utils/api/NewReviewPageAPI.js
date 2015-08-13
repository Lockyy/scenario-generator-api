import NewReviewPageConstants from '../constants/NewReviewPageConstants';
import { Promise } from 'es6-promise';

module.exports = {

  submit: function(review, resolve, reject) {
    let url = NewReviewPageConstants.CREATE_URL;

    return new Promise(function() {
      $.ajax({
        url: url,
        method: 'POST',
        data: JSON.stringify(review),
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
