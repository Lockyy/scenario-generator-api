import _ from 'lodash';
import React from 'react';
import { Link, Navigation } from 'react-router';
import  ProductFields from './ProductFields'
import  ReviewFields from './ReviewFields'
import  FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import  ReviewPageStore from '../../stores/ReviewPageStore'
import  FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import  FluxAlertActions from '../../actions/FluxAlertActions'

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
      this.context.router.transitionTo(`/app/products/${this._getProductId()}/${this._getProductData().slug}/reviews/${reviewID}`);
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
        _this.context.router.transitionTo(`/app/products/${data.product.id}/${data.product.slug}`)
        FluxNotificationsActions.showNotification({
          type: 'saved',
          subject: _.merge(data.product, {type: 'review'})
        })
      },
      function(error) {
        console.error(error)
      }
    );
  },

  _onCancel: function _onCancel(e) {
    let _this = this
    FluxAlertActions.showAlert({
      title: 'Cancel review?',
      success: 'Yes, Cancel Review',
      cancel:  'No, Continue Review',
      successCallback: function() {_this.context.router.transitionTo('/app')},
      cancelCallback: function() {},
    })
  },

  renderErrors: function renderErrors() {
    if(this.state.error && this.state.error.responseJSON) {
      return (
        <ul>
          {_.map(this.state.error.responseJSON.product, function(value, key) {
            return <li>{value}</li>
          })}
        </ul>
      )
    }
  },

  _getActionsContent: function _getActionsContent() {
    let submitText = `${this.state.mode} Review`;

    if (this.state.showDetails) {
      return (
        <div>
          <div className='button-errors help-block'>
          </div>
          <div className='submission-errors help-block'>
            {this.renderErrors()}
          </div>
          <div className='actions'>
            <button type='button' className='btn btn-default btn-round' onClick={this._onCancel}>Cancel</button>
            <input type='submit' className='btn btn-default submit btn-round' value={submitText} />
          </div>
        </div>
      );
    } else {
      return (<div />);
    }
  },

  render: function render() {
    let info = (<div className='info'>
      <div className='instructions'>
        If you can’t find the product you are looking for, click <i className='add-symbol'></i> to quickly add it to Fletcher <span className='internal-only'>Internal IT</span> and then rate and review.
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
