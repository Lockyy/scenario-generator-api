import alt from '../FluxAlt';
import FluxReviewPageActions from '../actions/FluxReviewPageActions'
import ReviewPageProductFieldsActions from '../actions/reviews/ReviewPageProductFieldsActions'
import ReviewPageReviewFieldsActions from '../actions/reviews/ReviewPageReviewFieldsActions'

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
};

class ReviewPageStore {
  constructor() {
    this.review = _.merge({}, emptyReview);
    this.showDetails = false;
    this.error = null;

    this.bindListeners({
      handleSetShowDetails: FluxReviewPageActions.SET_SHOW_DETAILS,
      handleFetchProduct: FluxReviewPageActions.FETCH_PRODUCT,
      handleSetProduct: FluxReviewPageActions.SET_PRODUCT,
      handleUpdateProduct: FluxReviewPageActions.UPDATE_PRODUCT,
      handleUpdateProductDescription: ReviewPageProductFieldsActions.UPDATE_PRODUCT_DESCRIPTION,
      handleUpdateProductUrl: ReviewPageProductFieldsActions.UPDATE_PRODUCT_URL,
      handleSetReview: FluxReviewPageActions.SET_REVIEW,
      handleUpdateReviewQualityScore: ReviewPageReviewFieldsActions.UPDATE_QUALITY_SCORE,
      handleUpdateReviewTitle: ReviewPageReviewFieldsActions.UPDATE_TITLE,
      handleUpdateReviewQualityReview: ReviewPageReviewFieldsActions.UPDATE_QUALITY_REVIEW,
      handleSubmitReview: FluxReviewPageActions.SUBMIT_REVIEW,
      handleAddFile: ReviewPageReviewFieldsActions.ADD_FILE,
      handleAddLink: ReviewPageReviewFieldsActions.ADD_LINK,
      handleAddTag: ReviewPageReviewFieldsActions.ADD_TAG,
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
    this.review.product = product;
  }

  handleUpdateProduct(product) {
    _.merge(this.review.product, product);
  }

  handleUpdateProductDescription(description) {
    this.review.product.description = description;
  }

  handleUpdateProductUrl(url) {
    this.review.product.url = url;
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

  handleUpdateReviewQualityScore(score) {
    this.review.quality_score = score
  }

  handleUpdateReviewTitle(title) {
    this.review.title = title
  }

  handleUpdateReviewQualityReview(qualityReview) {
    this.review.quality_review = qualityReview
  }

  handleSubmitReview() {
    this.review = _.merge({}, emptyReview);
  }

  handleRegisterError(error) {
    this.error = error;
  }
}

module.exports = alt.createStore(ReviewPageStore, 'ReviewPageStore');
