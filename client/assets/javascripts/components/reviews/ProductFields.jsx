import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import Rating from '../../components/Rating'
import TypeAhead from '../TypeAhead'

const ProductFields  = React.createClass({
  displayName: 'ProductFields',

  getDefaultProps: function getDefaultProps() {
    return {
      name: ''
    }
  },

  _getTypeaheadProps: function _getTypeaheadProps() {
    return {
      name: 'products',
      displayKey: 'name',
      templates: {
        header: function(data) {
          let query = data.query;
          return `<p class='tt-no-results' data-query='${query}'>“${query}”<span class='tt-help'>Create <i class="add-symbol"> + </i></span></p>`
        },
        empty: function(data) {
          let query = data.query;
          return `<p class='tt-no-results' data-query='${query}'>“${query}”<span class='tt-help'>Create <i class="add-symbol"> + </i></span></p>`
        },
        suggestion: function(data) {
          let name = data.name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
          return `<p>${name}<span class='tt-help'>Review <i class="review-symbol"> -> </i></span></p>`
        }
      },
    }
  },

  _getNewProductFields: function _getNewProductFields() {
    return (<fieldset className='details'>
      <span className='instructions'>Complete the form below to add a new product</span>
      <div className='form-group'>
        <label htmlFor='product[company[name]]'>Company Name <span className='required'>*</span></label>
        <input type='text' className='form-control' placeholder='e.g. Microsoft' name='product[company[name]]'
          ref='product_company_name' required/>
        <span className="help-block with-errors"></span>
      </div>

      <div className='form-group'>
        <label htmlFor='product[url]'>Product's website <span className='required'>*</span></label>
        <input type='text' className='form-control' placeholder='www.' name='product[url]'
          pattern="[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
          title="Include a valid url" ref='product_url' required/>
        <span className="help-block with-errors"></span>
      </div>

      <div className='form-group'>
        <label htmlFor='product[description]'>Description <span className='required'>*</span></label>
        <textarea type='text' className='form-control' placeholder='Write a brief description of the product'
          name='product[description]' rows='10' ref='product_description' required/>
        <span className="help-block with-errors"></span>
      </div>
    </fieldset>);
  },

  _getProductFieldsInfo: function _getProductFieldsInfo() {
    return (
      <div className='details'>
        <div className="header">
          <h3 className='title'><Link to={`/app/products/${this.props.id}`}>{this.props.name}</Link></h3>
          <h4 className='company'><Link to={`/app/companies/${this.props.company.id}`} >{this.props.company.name}</Link></h4>
        </div>

        <Rating value={this.props.rating} name='rating'/>

        <p className='description'>{this.props.description}</p>
      </div>
    );
  },

  _onChange: function _onChange(product_name) {
    this.props.onChange({ name: product_name }, false);
  },

  _onSelectProduct: function _onSelectProduct(product) {
    this.props.onChange(product, true);
  },

  _onSelectCreateProduct: function _onSelectCreateProduct(name) {
    let product = { name: name }
    this.props.onChange(product, true);
  },

  render: function render() {
    let newProduct = this.props.id === undefined;
    let details = this.props.showDetails ? (newProduct ? this._getNewProductFields() : this._getProductFieldsInfo()) : '';
    let productBloodhoundProps = {
      remote: {
        url: '/api/search?search=%QUERY&filter_by=name&match_mode=all',
        wildcard: '%QUERY',
        transform: function(data) { return data.products }
      }
    };

    let productTypeaheadProps = {
      name: 'products',
      displayKey: 'name',
      templates: {
        header: function(data) {
          let query = data.query;
          return `<p class='tt-no-results' data-query='${query}'>“${query}”<span class='tt-help'>Create <i class="add-symbol"> + </i></span></p>`
        },
        empty: function(data) {
          let query = data.query;
          return `<p class='tt-no-results' data-query='${query}'>“${query}”<span class='tt-help'>Create <i class="add-symbol"> + </i></span></p>`
        },
        suggestion: function(data) {
          let name = data.name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
          return `<p>${name}<span class='tt-help'>Review <i class="review-symbol"> -> </i></span></p>`
        }
      },
    };

    return (
      <fieldset>
        <h1 className='title'>Product Directory</h1>
        <div className='form-group'>
          <label htmlFor='product[name]'>Product's Name</label>
          <div className='input-group'>
            <TypeAhead name='product[name]' value={this.props.name} placeholder='e.g. Hololens' className='form-control'
              bloodhoundProps={productBloodhoundProps} typeaheadProps={productTypeaheadProps}
              onSelectOption={this._onSelectProduct} onSelectNoOption={this._onSelectCreateProduct} onChange={this._onChange}
              ref='product_name'/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" disabled={true}>Go</button>
            </span>
          </div>
          <span className="help-block with-errors"></span>
        </div>

        {details}
      </fieldset>
    );
  }
})

export default ProductFields;
