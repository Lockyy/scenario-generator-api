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
    this.showDetails = false;
    this.error = null;

    this.bindListeners({
      handleSetShowDetails: FluxReviewPageActions.SET_SHOW_DETAILS,
      handleFetchProduct: FluxReviewPageActions.FETCH_PRODUCT,
      handleSetProduct: FluxReviewPageActions.SET_PRODUCT,
      handleUpdateProduct: FluxReviewPageActions.UPDATE_PRODUCT,
      handleSetReview: FluxReviewPageActions.SET_REVIEW,
      handleSubmitReview: FluxReviewPageActions.SUBMIT_REVIEW,
      handleAddFile: FluxReviewPageActions.ADD_FILE,
      handleAddLink: FluxReviewPageActions.ADD_LINK,
      handleAddTag: FluxReviewPageActions.ADD_TAG,
      handleRegisterError: FluxReviewPageActions.REGISTER_ERROR
    });
  }

  handleSetShowDetails(showDetails) {
    this.showDetails = showDetails;
  }

  handleFetchProduct(product) {
    this.handleSetProduct(product);
  }

  handleSetProduct(product) {
    this.review = _.merge({}, emptyReview);
    this.review.product = product;
  }

  handleUpdateProduct(product) {
    _.merge(this.review.product, product);
  }

  handleAddFile(file) {
    this.review.attachments.push(file);
  }

  handleAddLink(link) {
    this.review.links.push(link);
  }

  handleAddTag(tag) {
    this.review.tags.push(tag);
  }

  handleSetReview(review) {
    this.review = review;
  }

  handleUpdateReview(review) {
    _.merge(this.review, review);
  }

  handleSubmitReview() {
  }

  handleRegisterError(error) {
    this.error = error;
  }
}

module.exports = alt.createStore(ReviewPageStore, 'ReviewPageStore');
