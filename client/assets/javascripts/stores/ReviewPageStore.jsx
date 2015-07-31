import alt from '../FluxAlt';
import FluxReviewPageActions from '../actions/FluxReviewPageActions'

const emptyReview = {
  product: {
    name: '',
    description: '',
    url: '',
    company: {
      name: ''
    }
  }
}

class ReviewPageStore {
  constructor() {
    this.review = emptyReview;
    this.error = null;

    this.bindListeners({
      handleUpdateReview: FluxReviewPageActions.UPDATE_REVIEW,
      handleSubmitReview: FluxReviewPageActions.SUBMIT_REVIEW,
      handleRegisterError: FluxReviewPageActions.REGISTER_ERROR
    });
  }

  handleUpdateReview(review) {
    this.review = review;
    this.error = null;
  }

  handleSubmitReview() {
    this.review = emptyReview;
  }

  handleRegisterError(error) {
    this.error = error;
  }
}

module.exports = alt.createStore(ReviewPageStore, 'ReviewPageStore');
