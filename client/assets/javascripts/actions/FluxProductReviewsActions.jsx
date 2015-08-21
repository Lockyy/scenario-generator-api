import alt from '../FluxAlt';
import _ from 'lodash';
import ReviewsAPI from '../utils/api/ReviewsAPI';

class FluxProductReviewsActions {

  fetchReviews(productID) {
    this.dispatch();

    ReviewsAPI.getReviews(
      productID,
      (data) => {
        this.actions.updateData(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
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
}

export default alt.createActions(FluxProductReviewsActions);
