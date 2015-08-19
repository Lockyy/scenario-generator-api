import _ from 'lodash';
import alt from '../FluxAlt';
import { Router, Navigation } from 'react-router'
import NewReviewPageAPI from '../utils/api/NewReviewPageAPI';
import ProductAPI from '../utils/api/ProductAPI';

class FluxReviewPageActions {
  setShowDetails(showDetails) {
    this.dispatch(showDetails);
  }

  setMode(mode) {
    this.dispatch(mode);
  }

  setCanChangeProduct(canChangeProduct) {
    this.dispatch(canChangeProduct);
  }

  fetchProduct(productId, success, error) {
    this.dispatch(productId);
    ProductAPI.getProduct(productId, success, error)
  }

  setProduct(product) {
    this.dispatch(product);
  }

  updateProduct(product) {
    this.dispatch(product);
  }

  fetchReview(productId, reviewId, resolve, reject) {
    NewReviewPageAPI.fetchReview(productId, reviewId, resolve, reject);
  }

  clearReview() {
    this.dispatch();
  }

  setReview(review) {
    this.dispatch(review);
  }

  updateReview(review) {
    this.dispatch(review);
  }

  submitReview(review, success, error) {
    let _this = this;
    NewReviewPageAPI.submit(review,
      function(data) {
        _this.dispatch();
        success(data);
      }, error);
  }

  registerError(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(FluxReviewPageActions);
