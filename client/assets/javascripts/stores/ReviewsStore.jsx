import alt from '../FluxAlt';
import FluxProductReviewsActions from '../actions/FluxProductReviewsActions'
import ReviewConstants from '../utils/constants/ReviewConstants';

class ReviewsStore {

  constructor() {
    this.data = [];
    this.sorting = ReviewConstants.DEFAULT_SORTING;
    this.error = null;

    this.bindListeners({
      handleFetchData: FluxProductReviewsActions.FETCH_REVIEWS,
      handleChangeSorting: FluxProductReviewsActions.CHANGE_SORTING,
      handleUpdateData: FluxProductReviewsActions.UPDATE_DATA,
      handleRegisterError: FluxProductReviewsActions.REGISTER_ERROR
    });
  }

  handleFetchData() {
    return false;
  }

  handleChangeSorting(sorting) {
    this.sorting = sorting;
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