import _ from 'lodash';
import React from 'react';
import { Link, Navigation } from 'react-router';
import  ProductFields from './ProductFields'
import  ReviewFields from './ReviewFields'
import  FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import  ReviewPageStore from '../../stores/ReviewPageStore'

const NewReviewPage  = React.createClass({
  displayName: 'NewReviewPage',
  mixins: [ Navigation ],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function getInitialState() {
    return {
      review: {
        mode: 'create',
        product: {}
      }
    }
  },

  componentDidMount: function componentDidMount() {
    ReviewPageStore.listen(this._onChange);
    let params = this.context.router.state.params;
    FluxReviewPageActions.clearReview();

    if (params.productId) {
      this._fetchProduct(params.productId);
      if (params.reviewId) {
        this._fetchReview(params.productId, params.reviewId);
      }
    }

    $(this.refs.new_review_form.getDOMNode()).validator();
  },

  componentDidUpdate: function componentDidUpdate() {
    $(this.refs.new_review_form.getDOMNode()).validator('destroy');
    $(this.refs.new_review_form.getDOMNode()).validator();
  },

  _fetchReview: function _fetchReview(productID, reviewID) {
    FluxReviewPageActions.fetchReview(productID, reviewID, function(review) {
      FluxReviewPageActions.setReview(review);
      FluxReviewPageActions.setMode('update');
      FluxReviewPageActions.setCanChangeProduct(false);
      FluxReviewPageActions.setShowDetails(true);
    });
  },

  _fetchProduct: function _fetchProduct(productID) {
    FluxReviewPageActions.fetchProduct(productID, function(product) {
      FluxReviewPageActions.setCanChangeProduct(false);
      FluxReviewPageActions.setShowDetails(true);
      FluxReviewPageActions.setProduct(product);
    });
  },

  _getProductData: function _getProductData() {
    return this.state.review.product || {}
  },

  _getProductId: function _getProductId() {
    return this._getProductData().id;
  },

  _getCurrentUserReviewId: function _getCurrentUserReviewId() {
    if(this.state && this.state.review.product && this.state.review.product.review) {
      return this.state.review.product.review.id
    }
    return undefined
  },

  _checkForRedirect: function _checkForRedirect() {
    let params = this.context.router.state.params;
    let reviewID = this._getCurrentUserReviewId();

    if(reviewID && params.reviewId != reviewID) {
      this.context.router.transitionTo(`/app/products/${this._getProductId()}/reviews/${reviewID}`);
      this._fetchReview(this._getProductId(), reviewID);
    }
  },

  _onChange: function _onChange(review) {
    this.setState(function(oldState) {
      let newState = _.merge({}, oldState, review);

      if (oldState.review.product.id !== review.review.product.id) {
        newState.review.product.id = review.review.product.id;
      }
      if (oldState.review.product.company && review.review.product.company &&
          oldState.review.product.company.id !== review.review.product.company.id) {
        newState.review.product.company.id = review.review.product.company.id;
      }

      if (review.review.tags) {
        newState.review.tags = review.review.tags
      }

      if(review.review.links != undefined) {
        newState.review.links = review.review.links
      }

      if(review.review.attachments != undefined) {
        newState.review.attachments = review.review.attachments
      }

      return newState;
    });

    this._checkForRedirect();
  },

  _onSubmit: function _onSubmit(e) {
    e.preventDefault();

    let _this = this;
    let review = _this.state;

    FluxReviewPageActions.submitReview(review,
      function(data) {
        _this.context.router.transitionTo(`/app/products/${data.product.id}`)
      },
      function(error) {
        console.error(error)
      }
    );
  },

  _onCancel: function _onCancel(e) {
    if (!window.confirm('Are you sure you want to cancel?')) {
      e.preventDefault()
    }
  },

  _getActionsContent: function _getActionsContent() {
    let submitText = `${this.state.mode} Review`;

    if (this.state.showDetails) {
      return (<div className='actions'>
        <Link to={'/app'} onClick={this._onCancel}>
          <button type='button' className='btn btn-default btn-round'>Cancel</button>
        </Link>
        <input type='submit' className='btn btn-default submit btn-round' value={submitText} />
      </div>);
    } else {
      return (<div />);
    }
  },

  render: function render() {
    let info = (<div className='info'>
      <div className='instructions'>
        If you can't find a product, please select the Add and Review <i className='add-symbol'></i> option from the drop down.
        This will add the product to the directory when you've reviewed it.
      </div>
    </div>);

    return (
    <div className='product new'>
      <div className='help'>
        <h1 className='title'>Write a Review</h1>
        <p className='instructions'>Search and select the product you want to rate and review.</p>
      </div>
      <div className='main-content'>
        <form className='form review new' ref='new_review_form' onSubmit={this._onSubmit}>
          <ProductFields ref='product_fields' canChangeProduct={this.state.canChangeProduct} mode={this.state.mode}
            showDetails={this.state.showDetails} {...this._getProductData()} />
          <ReviewFields ref='review_fields' showDetails={this.state.showDetails} {...this.state.review} />

          {this._getActionsContent()}
        </form>
      </div>
      {this.state.showDetails ? '' : info}
    </div>
    );
  }
});

export default NewReviewPage;
