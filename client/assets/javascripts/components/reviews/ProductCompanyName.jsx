import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import ProductName from './ProductName'
import TypeAhead from '../TypeAhead'

const ProductCompanyName  = React.createClass({
  displayName: 'ProductCompanyName',

  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      value: ''
    }
  },

  getValue: function getValue() {
    return React.findDOMNode(this.refs.product_company_name).value
  },

  _getBloodhoundProps: function _getBloodhoundProps() {
    return {
      remote: {
        url: '/api/search?search=%QUERY&filter_by=name&match_mode=all',
        wildcard: '%QUERY',
        transform: function(data) { return data.companies.data }
      }
    }
  },

  _getTypeaheadProps: function _getTypeaheadProps() {
    return {
      name: 'companies',
      displayKey: 'name',
      templates: {
        empty: function(data) {
          let query = data.query;
          return `<p class='tt-no-results'>“${query}” will be created.</p>`
        },
        suggestion: function(data) {
          let name = data.name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
          return `<p>${name}</p>`
        }
      },
    }
  },

  _onCompanyNameChange: function _onCompanyNameChange(product_company_name) {
    this._updateProduct({ company: { name: product_company_name } }, true)
  },

  _updateProduct: function _updateProduct(product, showDetails) {
    this.props.onUpdateProduct(product, showDetails)
  },

  _onSelectCompany: function _onSelectCompany(company) {
    this._onCompanyNameChange(company.name);
  },

  _onSelectCreateCompany: function _onSelectCreateCompany(name) {
    this._onCompanyNameChange(name);
  },

  render: function render() {
    return (
      <div className='form-group'>
        <label htmlFor='product[company[name]]'>Company Name <span className='required'>*</span></label>

        <TypeAhead name='product[company[name]]' value={this.props.value} placeholder='e.g. Microsoft'
          className='form-control' bloodhoundProps={this._getBloodhoundProps()} typeaheadProps={this._getTypeaheadProps()}
          onSelectOption={this._onSelectCompany} onSelectNoOption={this._onSelectCreateCompany} onChange={this._onCompanyNameChange}
          ref='product_company_name' required/>
          <span className="help-block with-errors"></span>
      </div>
    );
  }
})

export default ProductCompanyName;
