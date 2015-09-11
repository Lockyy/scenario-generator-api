import alt from '../FluxAlt';
import _ from 'lodash';
import ReviewsAPI from '../utils/api/ReviewsAPI';

class FluxProductReviewsActions {

  fetchReviews(productID, sorting) {
    ReviewsAPI.getReviews(
      productID,
      sorting,
      (data) => {
        this.actions.updateData(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  changeSorting(sorting, productID) {
    this.dispatch(sorting);
    this.actions.fetchReviews(productID, sorting);
  }

  updateData(data) {
    this.dispatch(data);
  }

  registerError(error) {
    this.dispatch(error);
  }

  voteOnReview(productId, reviewId, helpful, resolve, reject) {
    ReviewsAPI.voteOnReview(productId, reviewId, helpful, resolve, reject);
  }

  cancelVoteOnReview(productId, reviewId, resolve, reject) {
    ReviewsAPI.cancelVoteOnReview(productId, reviewId, resolve, reject);
  }
}

export default alt.createActions(FluxProductReviewsActions);
