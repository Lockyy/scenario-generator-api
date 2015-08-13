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
        product: {}
      }
    }
  },

  componentDidMount: function componentDidMount() {
   ReviewPageStore.listen(this._onChange);
    let params = this.context.router.state.params;
    if (params.productId) {
      FluxReviewPageActions.fetchProduct(params.productId, function(product) {
        FluxReviewPageActions.setShowDetails(true);
        FluxReviewPageActions.setProduct(product);
      });
    }

    $(this.refs.new_review_form.getDOMNode()).validator();
  },

  _getProductData: function _getProductData() {
    return this.state.review.product || {}
  },

  _getProductId: function _getProductId() {
    return this._getProductData().id;
  },

  _getReview: function _getReview() {
    let prodRefs = this.refs.product_fields.refs;
    let review = this.refs.review_fields.getFields();

    if (this._getProductId()) {
      review.product = {
        id: this._getProductId()
      }
    } else {
      review.product = {
        name: prodRefs.product_name.getValue(),
        description: prodRefs.product_description.getDOMNode().value,
        url: prodRefs.product_url.getDOMNode().value,
        company: {
          name: prodRefs.product_company_name.getValue()
        }
      }
    }

    return { review: review };
  },

  _onChange: function _onChange(review) {
    this.setState(review);
  },

  _onFormChange: function _onFormChange(e) {
    let review = this._getReview();
    this._onChange(review);
  },

  _onSetProduct: function _onSetProduct(product, showDetails) {
    FluxReviewPageActions.setShowDetails(showDetails);
    FluxReviewPageActions.setProduct(product);
  },

  _onUpdateProduct: function _onSetProduct(product, showDetails) {
    FluxReviewPageActions.setShowDetails(showDetails);
    FluxReviewPageActions.updateProduct(product);
  },

  _onSubmit: function _onSubmit(e) {
    e.preventDefault();

    let _this = this;
    let review = _this._getReview();

    FluxReviewPageActions.updateReview(review);
    FluxReviewPageActions.submitReview(review, function(data) {
      _this.context.router.transitionTo(`/app/products/${data.reviewable.id}`)
    },
    function(error) {
      console.error(error)
    });
  },

  _getActionsContent: function _getActionsContent() {
    if (this.state.showDetails) {
      return (<div className='actions'>
        <Link to={'/app'} >
          <button type='button' className='btn btn-default btn-round'>Cancel</button>
        </Link>
        <input type='submit' className='btn btn-default submit btn-round' value='Create Review' />
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

          <ProductFields ref='product_fields' onUpdateProduct={this._onUpdateProduct} onSetProduct={this._onSetProduct}
            showDetails={this.state.showDetails} {...this._getProductData()} />
          <ReviewFields ref='review_fields' showDetails={this.state.showDetails}/>

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
