import _ from 'lodash';
import alt from '../FluxAlt';
import { Router, Navigation } from 'react-router'
import NewReviewPageAPI from '../utils/NewReviewPageAPI';

class FluxReviewPageActions {
  updateReview(review) {
    this.dispatch(review)
  }

  submitReview(review, router) {
    this.dispatch();

    NewReviewPageAPI.submit(review,
      function(data) {
        router.transitionTo('/app')
      },
      function(error) {
        console.error(error)
      }
    );
  }

  registerError(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(FluxReviewPageActions);
