import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import  ProductFields from './ProductFields'
import  FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import  ReviewPageStore from '../../stores/ReviewPageStore'

const NewReviewPage  = React.createClass({
  displayName: 'NewReviewPage',
  mixins: [ Navigation ],

  componentDidMount: function componentDidMount() {
    $(this.refs.new_review_form.getDOMNode()).validator();
  },

  _getReview: function _getReview() {
    let prodRefs = this.refs.product_fields.refs;

    return {
      product: {
        name: prodRefs.product_name.getDOMNode().value,
        description: prodRefs.product_description.getDOMNode().value,
        url: prodRefs.product_url.getDOMNode().value,
        company: {
          name: prodRefs.product_company_name.getDOMNode().value
        }
      }
    };
  },

  _onSubmit: function _onSubmit(e) {
    let review = this._getReview();

    FluxReviewPageActions.updateReview(review);
    FluxReviewPageActions.submitReview(review, this.context.router);

    e.preventDefault();
  },

  render: function render() {
    return (
    <div className='product new'>
      <div className='help'>
        <h1 className='title'>Write a Review</h1>
        <p className='instructions'>Search and select the product you want to rate and review.</p>
      </div>
      <div className='main-content'>
        <form className='form review new' ref='new_review_form' onSubmit={this._onSubmit}>

          <ProductFields ref='product_fields'/>

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
