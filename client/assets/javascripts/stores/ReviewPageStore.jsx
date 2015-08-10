import alt from '../FluxAlt';
import FluxReviewPageActions from '../actions/FluxReviewPageActions'

const emptyReview = {
  links: [],
  attachments: [],
  tags: [],
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
      handleAddTag: FluxReviewPageActions.ADD_TAG,
      handleSetProduct: FluxReviewPageActions.SET_PRODUCT,
      handleRegisterError: FluxReviewPageActions.REGISTER_ERROR
    });
  }

  getReview() {
    return this.review;
  }

  handleUploadFile(file) {
    this.review.attachments.push(file);
  }

  handleAddLink(link) {
    this.review.links.push(link);
  }

  handleAddTag(tag) {
    this.review.tags.push(tag);
  }

  handleSetProduct(product) {
    _.merge(this.review.product, product);
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
