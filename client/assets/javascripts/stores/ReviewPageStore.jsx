import alt from '../FluxAlt';
import FluxReviewPageActions from '../actions/FluxReviewPageActions'

const emptyReview = {
  links: [],
  attachments: [],
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
      handleUploadFile: FluxReviewPageActions.UPLOAD_FILE,
      handleAddLink: FluxReviewPageActions.ADD_LINK,
      handleRegisterError: FluxReviewPageActions.REGISTER_ERROR
    });
  }

  handleUploadFile(file) {
    this.review.attachments.push(file);
  }

  handleAddLink(link) {
    this.review.links.push(link);
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
