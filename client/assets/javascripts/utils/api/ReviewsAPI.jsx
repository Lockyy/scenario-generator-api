import { Promise } from 'es6-promise';
import ReviewConstants from '../constants/ReviewConstants';

module.exports = {
  getReviews: function(productID, sorting, resolve, reject) {
    if (productID) {
      let url = `/api/products/${productID}/reviews`;
      return new Promise(function() {
        $.ajax({
          url: url,
          success: resolve,
          data: { sorting: sorting }
        });
      });
    }
  },

  voteOnReview: function(productID, reviewId, helpful, resolve, reject) {
    if (productID) {
      let url = `/api/products/${productID}/reviews/${reviewId}/review_votes`;
      return new Promise(function() {
        $.ajax({
          type: 'POST',
          url: url,
          data: {helpful: helpful},
          success: resolve
        });
      });
    }
  },

  cancelVoteOnReview: function(productID, reviewId, resolve, reject) {
    if (productID) {
      let url = `/api/products/${productID}/reviews/${reviewId}/review_votes`;
      return new Promise(function() {
        $.ajax({
          type: 'delete',
          url: url,
          success: resolve
        });
      });
    }
  }
};
