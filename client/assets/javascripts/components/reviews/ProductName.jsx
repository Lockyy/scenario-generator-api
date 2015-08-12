import React from 'react';
import _ from 'lodash';
import TypeAhead from '../TypeAhead'

const ProductName  = React.createClass({
  displayName: 'ProductName',

  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      disableButton: false
    }
  },

  getValue: function getValue() {
    return React.findDOMNode(this.refs.product_name).value
  },

  _getBloodhoundProps: function _getBloodhoundProps() {
    return {
      remote: {
        url: '/api/search?search=%QUERY&filter_by=name&match_mode=all',
        wildcard: '%QUERY',
        transform: function(data) { return data.products }
      }
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

  _onNameChange: function _onNameChange(product_name) {
    this.props.onSetProduct({ name: product_name }, false)
  },

  _onSelectProduct: function _onSelectProduct(product) {
    this.props.onSetProduct(product, true);
  },

  _onSelectCreateProduct: function _onSelectCreateProduct(name) {
    let product = { name: name }
    this.props.onSetProduct(product, true);
  },

  render: function render() {
    return (
      <div className='form-group'>
        <label htmlFor='product[name]'>Product's Name</label>
        <div className='input-group'>
          <TypeAhead name='product[name]' value={this.props.name} placeholder='e.g. Hololens' className='form-control'
            bloodhoundProps={this._getBloodhoundProps()} typeaheadProps={this._getTypeaheadProps()}
            onSelectOption={this._onSelectProduct} onSelectNoOption={this._onSelectCreateProduct} onChange={this._onNameChange}
            ref='product_name'/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" disabled={this.props.disableButton}>Go</button>
          </span>
        </div>
        <span className="help-block with-errors"></span>
      </div>
    );
  }
})

export default ProductName;
