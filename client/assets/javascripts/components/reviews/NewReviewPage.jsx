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

    if (params.reviewId) {
      FluxReviewPageActions.fetchReview(params.productId, params.reviewId, function(review) {
        FluxReviewPageActions.setReview(review);
        FluxReviewPageActions.setMode('update');
        FluxReviewPageActions.setCanChangeProduct(false);
        FluxReviewPageActions.setShowDetails(true);
      });
    }
    if (params.productId) {
      FluxReviewPageActions.fetchProduct(params.productId, function(product) {
        FluxReviewPageActions.setCanChangeProduct(false);
        FluxReviewPageActions.setShowDetails(true);
        FluxReviewPageActions.setProduct(product);
      });
    }

    $(this.refs.new_review_form.getDOMNode()).validator();
  },

  componentDidUpdate: function componentDidUpdate() {
    $(this.refs.new_review_form.getDOMNode()).validator('destroy');
    $(this.refs.new_review_form.getDOMNode()).validator();
  },

  _getProductData: function _getProductData() {
    return this.state.review.product || {}
  },

  _getProductId: function _getProductId() {
    return this._getProductData().id;
  },

  _onChange: function _onChange(review) {
    this.setState(function(oldState) {
      let newState = _.merge({}, oldState, review);

      if (oldState.review.product.id !== review.review.product.id) {
        newState.review.product.id = review.review.product.id;
      }

      return newState;
    });
  },

  _onSubmit: function _onSubmit(e) {
    e.preventDefault();

    let _this = this;
    let review = _this.state;

    FluxReviewPageActions.submitReview(review,
      function(data) {
        _this.context.router.transitionTo(`/app/products/${data.reviewable.id}`)
      },
      function(error) {
        console.error(error)
      }
    );
  },

  _getActionsContent: function _getActionsContent() {
    let submitText = `${this.state.mode} Review`;

    if (this.state.showDetails) {
      return (<div className='actions'>
        <Link to={'/app'} >
          <button type='button' className='btn btn-default btn-round'>Cancel</button>
        </Link>
        <input type='submit' className='btn btn-default submit btn-round' value={submitText} />
      </div>);
    } else {
      return (<div />);
    }
  },

  render: function render() {
    /* TODO
      //TODO: Implement validation messages
    */

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

      <div className='info'>
        <div className='instructions'>If you can’t ﬁnd the product
          you are looking for,
          <p className='more-instructions'>
            click<i className='add-symbol'> + </i>to quickly add it
            to Fletcher and then
            rate and review.
          </p>
        </div>
      </div>
    </div>
    );
  }
})

export default NewReviewPage;
