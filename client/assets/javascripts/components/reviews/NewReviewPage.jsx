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
        name: prodRefs.product_name.getDOMNode().value,
        description: prodRefs.product_description.getDOMNode().value,
        url: prodRefs.product_url.getDOMNode().value,
        company: {
          name: prodRefs.product_company_name.getDOMNode().value
        }
      }
    }

    return { review: review };
  },

  _onChange: function _onChange(review) {
    this.setState(function(oldReview) {
      return {
        // Merge the old data with the new data
        data: _.merge(oldReview, review, function(a, b) {
          if (_.isArray(a)) {
            return _.unique(a.concat(b), function(obj) {
              // check the objects id
              if(typeof a[0] === 'object') { return obj.id }
              // If it's an array of tags, just check the tag directly.
              return obj
            })
          }
        })
      };
    });
  },

  _onFormChange: function _onFormChange(e) {
    let review = this._getReview();
    this._onChange(review);
  },

  _onSubmit: function _onSubmit(e) {
    e.preventDefault();

    let review = this._getReview();

    FluxReviewPageActions.updateReview(review);
    FluxReviewPageActions.submitReview(review, this.context.router);
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

          <ProductFields ref='product_fields' {...this._getProductData()} onChange={this._onFormChange} />
          <ReviewFields ref='review_fields'/>

          <div className='actions'>
            <Link to={'/app'} >
              <button type='button' className='btn btn-default btn-round'>Cancel</button>
            </Link>
            <input type='submit' className='btn btn-default submit btn-round' value='Create Review' />
          </div>
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
