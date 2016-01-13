import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import RegexConstants from '../../utils/constants/RegexConstants'
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import ReviewPageProductFieldsPageActions from '../../actions/reviews/ReviewPageProductFieldsActions'
import CompanyFields from './CompanyFields'
import ProductName from './ProductName'
import Rating from '../../components/Rating'
import TypeAhead from '../TypeAhead'

const ProductFields  = React.createClass({
  displayName: 'ProductFields',

  getDefaultProps: function getDefaultProps() {
    return {
      canChangeProduct: true,
      name: '',
      company: {
        name: ''
      }
    }
  },

  _onKeyPress: function _onKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  },

  _setProduct: function _setProduct(product, showDetails) {
    FluxReviewPageActions.setShowDetails(showDetails);
    FluxReviewPageActions.setProduct(product);
  },

  _updateProduct: function _updateProduct(product, showDetails) {
    FluxReviewPageActions.setShowDetails(showDetails);
    FluxReviewPageActions.updateProduct(product);
  },

  _updateProductUrl: function _updateProductUrl(e) {
    let url = e.target.value;
    ReviewPageProductFieldsPageActions.updateProductUrl(url);
    this.triggerValidation(e);
  },

  _updateProductDescription: function _updateProductUrl(e) {
    let description = e.target.value;
    ReviewPageProductFieldsPageActions.updateProductDescription(description);
    this.triggerValidation(e);
  },

  triggerValidation: function triggerValidation(e) {
    let target = $(e.target)
    // Set timeout so validation runs after react.js refresh.
    setTimeout(function() {
      // Run validation
      let validator = target.parents('.form.review.new').validator('validate');
      // Clear errors from fields after the current one since validation should only
      // appear on fields above the one clicked.
      target.parents('.form-group').nextAll().children('.help-block.with-errors').empty();
      let hasErrors = validator.has('.has-error').length;
      // If there are any errors tell the user to go fill out the correct fields.
      if (hasErrors) {
        validator.find('.button-errors').html('Please fill out required fields.')
      } else {
        validator.find('.button-errors').html('')
      }
    }, 100);
  },

  _getNewProductFields: function _getNewProductFields() {
    return (<fieldset className='details'>
      <span className='instructions'>Complete the form below to add a new product</span>

      <CompanyFields ref='product_company_fields' {...this.props.company} />

      <div className='form-group'>
        <label htmlFor='product[url]'>{"Product's website"} <span className='required'>*</span></label>
        <input type='text' className='form-control' placeholder='www.' name='product[url]'
          pattern={RegexConstants.URL_PATTERN}
          title="Include a valid url" ref='product_url' value={this.props.url}
          onChange={this._updateProductUrl} onKeyPress={this._onKeyPress} onBlur={this.triggerValidation} required/>
        <span className="help-block with-errors"></span>
      </div>

      <div className='form-group'>
        <label htmlFor='product[description]'>Description <span className='required'>*</span></label>
        <textarea type='text' className='form-control' placeholder='Write a brief description of the product'
          name='product[description]' rows='10' ref='product_description' value={this.props.description}
          onChange={this._updateProductDescription} onBlur={this.triggerValidation} required/>
        <span className="help-block with-errors"></span>
      </div>

    </fieldset>);
  },

  _getProductFieldsInfo: function _getProductFieldsInfo() {
    return (
      <div className='details'>
        <div className="header">
          <h3 className='title'><Link to={`/app/products/${this.props.id}/${this.props.slug}`}>{this.props.name}</Link></h3>
          <h4 className='company'><Link to={`/app/companies/${this.props.company.id}/${this.props.company.slug}`} >{this.props.company.name}</Link></h4>
        </div>

        <Rating value={this.props.rating} name='rating'/>

        <p className='description'>{this.props.description}</p>
      </div>
    );
  },

  render: function render() {
    let newProduct = this.props.id === undefined;
    let details = this.props.showDetails ? (newProduct ? this._getNewProductFields() : this._getProductFieldsInfo()) : '';

    return (
      <fieldset>
        <h1 className='title'>Product Directory</h1>
        <ProductName ref='product_name' value={this.props.name} disableButton={!this.props.showDetails}
          onSetProduct={this._setProduct} disabled={!this.props.canChangeProduct} />
        {details}
      </fieldset>
    );
  }
})

export default ProductFields;
