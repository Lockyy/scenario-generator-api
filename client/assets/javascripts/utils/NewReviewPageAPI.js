import NewReviewPageConstants from './constants/NewReviewPageConstants';

module.exports = {

  submit: function(review, resolve, reject) {
    let url = NewReviewPageConstants.CREATE_URL;

    return new Promise(function() {
      $.post(url, review, resolve).fail(reject);
    });
  }
};
