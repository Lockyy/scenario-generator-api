import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import  FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import  ReviewPageStore from '../../stores/ReviewPageStore'

const NewReviewPage  = React.createClass({
  displayName: 'NewReviewPage',
  mixins: [ Navigation ],

  componentDidMount: function componentDidMount() {
    $(this.refs.new_review_form.getDOMNode()).validator();
  },

  _getReview: function _getReview() {
    let refs = this.refs;

    return {
      product: {
        name: refs.product_name.getDOMNode().value,
        description: refs.product_description.getDOMNode().value,
        url: refs.product_url.getDOMNode().value,
        company: {
          name: refs.product_company_name.getDOMNode().value
        }
      }
    };
  },

  _onChange: function _onChange() {
    FluxReviewPageActions.updateReview(this._getReview());
  },

  _onSubmit: function _onSubmit(e) {
    this._onChange();

    let review = ReviewPageStore.getState().review;
    FluxReviewPageActions.submitReview(review, this.context.router);
    e.preventDefault();
  },

  _getNewProductFields: function _getNewProductFields() {
    return (<fieldset>
      <span className='instructions'>Complete the form below to add a new product</span>
      <div className='form-group'>
        <label htmlFor='product[company[name]]'>Company Name <span className='required'>*</span></label>
        <input type='text' className='form-control' placeholder='e.g. Microsoft' name='product[company[name]]'
          ref='product_company_name' onChange={this._onChange} required/>
      </div>

      <div className='form-group'>
        <label htmlFor='product[url]'>Product's website <span className='required'>*</span></label>
        <input type='url' className='form-control' placeholder='www.' name='product[url]'
          ref='product_url' onChange={this._onChange} required/>
      </div>

      <div className='form-group'>
        <label htmlFor='product[description]'>Description <span className='required'>*</span></label>
        <textarea type='text' className='form-control' placeholder='Write a brief description of the product'
          name='product[description]' rows='10' ref='product_description' onChange={this._onChange} required/>
      </div>
    </fieldset>);
  },

  render: function render() {
    let isNewProduct = true;

    return (
    <div className='product new'>
      <div className='help'>
        <h1 className='title'>Write a Review</h1>
        <p className='instructions'>Search and select the product you want to rate and review.</p>
      </div>
      <div className='main-content'>
        <h1 className='title'>Product Directory</h1>
        <form className='form review new' ref='new_review_form' onSubmit={this._onSubmit}>
          <div className='form-group'>
            <label htmlFor='product[name]'>Product's Name</label>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder='e.g. Hololens' name='product[name]'
                ref='product_name' onChange={this._onChange} required/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" disabled={true}>Go</button>
              </span>
            </div>
          </div>

          {isNewProduct ? this._getNewProductFields() : ''}

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
