import alt from '../FluxAlt';
import FluxProductReviewsActions from '../actions/FluxProductReviewsActions'

class ReviewsStore {

  constructor() {
    this.data = [];
    this.error = null;

    this.bindListeners({
      handleFetchData: FluxProductReviewsActions.FETCH_REVIEWS,
      handleUpdateData: FluxProductReviewsActions.UPDATE_DATA,
      handleRegisterError: FluxProductReviewsActions.REGISTER_ERROR
    });
  }

  handleFetchData() {
    return false;
  }

  handleUpdateData(data) {
    this.data = data;
    this.error = null;
  }

  handleRegisterError(error) {
    this.error = error;
  }
}

module.exports = alt.createStore(ReviewsStore, 'ReviewsStore');