import alt from '../FluxAlt';
import FluxReviewPageActions from '../actions/FluxReviewPageActions'
import ReviewPageProductFieldsActions from '../actions/reviews/ReviewPageProductFieldsActions'
import ReviewPageCompanyFieldsActions from '../actions/reviews/ReviewPageCompanyFieldsActions'
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
      name: '',
      tags: []
    }
  }
};

class ReviewPageStore {
  constructor() {
    this.resetDefaultState();

    this.bindListeners({
      handleSetShowDetails: FluxReviewPageActions.SET_SHOW_DETAILS,
      handleSetMode: FluxReviewPageActions.SET_MODE,
      handleSetCanChangeProduct: FluxReviewPageActions.SET_CAN_CHANGE_PRODUCT,
      handleFetchProduct: FluxReviewPageActions.FETCH_PRODUCT,
      handleSetProduct: FluxReviewPageActions.SET_PRODUCT,
      handleUpdateProduct: FluxReviewPageActions.UPDATE_PRODUCT,
      handleUpdateProductDescription: ReviewPageProductFieldsActions.UPDATE_PRODUCT_DESCRIPTION,
      handleUpdateProductUrl: ReviewPageProductFieldsActions.UPDATE_PRODUCT_URL,
      handleSetCompany: ReviewPageCompanyFieldsActions.SET_COMPANY,
      handleUpdateCompany: ReviewPageCompanyFieldsActions.UPDATE_COMPANY,
      handleUpdateCompanyUrl: ReviewPageCompanyFieldsActions.UPDATE_COMPANY_URL,
      handleUpdateCompanyDescription: ReviewPageCompanyFieldsActions.UPDATE_COMPANY_DESCRIPTION,
      handleUpdateCompanyAvatar: ReviewPageCompanyFieldsActions.UPDATE_COMPANY_AVATAR,
      handleAddCompanyTag: ReviewPageCompanyFieldsActions.ADD_TAG,
      handleSetCompanyTags: ReviewPageCompanyFieldsActions.SET_TAGS,
      resetDefaultState: FluxReviewPageActions.CLEAR_REVIEW,
      handleFetchReview: FluxReviewPageActions.FETCH_REVIEW,
      handleSetReview: FluxReviewPageActions.SET_REVIEW,
      handleUpdateReviewQualityScore: ReviewPageReviewFieldsActions.UPDATE_QUALITY_SCORE,
      handleUpdateReviewTitle: ReviewPageReviewFieldsActions.UPDATE_TITLE,
      handleUpdateReviewQualityReview: ReviewPageReviewFieldsActions.UPDATE_QUALITY_REVIEW,
      handleUpdateReviewPriceScore: ReviewPageReviewFieldsActions.UPDATE_PRICE_SCORE,
      handleUpdateReviewPriceReview: ReviewPageReviewFieldsActions.UPDATE_PRICE_REVIEW,
      handleSubmitReview: FluxReviewPageActions.SUBMIT_REVIEW,
      handleAddFile: ReviewPageReviewFieldsActions.ADD_FILE,
      handleAddLink: ReviewPageReviewFieldsActions.ADD_LINK,
      handleRemoveLink: ReviewPageReviewFieldsActions.REMOVE_LINK,
      handleAddTag: ReviewPageReviewFieldsActions.ADD_TAG,
      handleSetTags: ReviewPageReviewFieldsActions.SET_TAGS,
      handleRegisterError: FluxReviewPageActions.REGISTER_ERROR
    });
  }

  handleSetMode(mode) {
    this.mode = mode;
  }

  handleSetShowDetails(showDetails) {
    this.showDetails = showDetails;
  }

  handleSetCanChangeProduct(canChangeProduct) {
    this.canChangeProduct = canChangeProduct;
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

  handleRemoveLink(link) {
    this.review.links = this.review.links.filter(function( obj ) {
      return obj.url !== link.url;
    });
  }

  handleAddTag(tag) {
    this.review.tags.push(tag);
  }

  handleSetTags(tags) {
    this.review.tags = tags;
  }

  handleFetchReview(review) {
    this.review = review;
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

  handleUpdateReviewPriceScore(score) {
    this.review.price_score = score
  }

  handleUpdateReviewPriceReview(priceReview) {
    this.review.price_review = priceReview
  }

  handleSubmitReview() {
    this.resetDefaultState();
  }

  handleSetCompany(company) {
    this.review.product.company = _.merge({}, company);
  }

  handleUpdateCompany(company) {
    _.merge(this.review.product.company, company);
  }

  handleUpdateCompanyUrl(url) {
    this.review.product.company.url = url;
  }

  handleUpdateCompanyDescription(description) {
    this.review.product.company.description = description;
  }

  handleUpdateCompanyAvatar(avatar) {
    this.review.product.company.avatar = avatar;
  }

  handleAddCompanyTag(tag) {
    this.review.product.company.tags = this.review.product.company.tags || [];
    this.review.product.company.tags.push(tag);
  }

  handleSetCompanyTags(tags) {
    this.review.product.company.tags = tags;
  }

  handleRegisterError(error) {
    this.error = error;
  }

  resetDefaultState() {
    this.review = _.merge({}, emptyReview);
    this.showDetails = false;
    this.mode = 'create';
    this.canChangeProduct = true;
    this.error = null;
  }
}

module.exports = alt.createStore(ReviewPageStore, 'ReviewPageStore');
