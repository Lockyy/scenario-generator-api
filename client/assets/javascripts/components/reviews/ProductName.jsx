import React from 'react';
import _ from 'lodash';
import TypeAhead from '../TypeAhead'

const ProductName  = React.createClass({
  displayName: 'ProductName',

  getDefaultProps: function getDefaultProps() {
    return {
      value: '',
      disableButton: false
    }
  },

  getValue: function getValue() {
    return React.findDOMNode(this.refs.product_name).value
  },

  _getBloodhoundProps: function _getBloodhoundProps() {
    return {
      remote: {
        url: '/api/search?search_string=%QUERY&filter_by=name&match_mode[products]=all',
        wildcard: '%QUERY',
        transform: function(data) { return data.products.data }
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
          return `<p class='tt-no-results tt-empty' data-query='${query}'>“${query}”<span class='tt-help'>Add and Review <i class="add-symbol"> + </i></span></p>`
        },
        empty: function(data) {
          let query = data.query;
          return `<p class='tt-no-results' data-query='${query}'>“${query}”<span class='tt-help'>Add and Review <i class="add-symbol"> + </i></span></p>`
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

  _hideCreateWhenMatch: function _hideCreateWhenMatch(e) {
    let typeahead = $(e.target);
    typeahead.on("typeahead:render", function() {
      if (arguments.length < 2) return;

      let suggestions = _.takeRight(arguments, arguments.length - 1);
      let isSuggested = _.filter(suggestions, function(suggestion) {
        return suggestion.name && typeahead.val() && suggestion.name.toLowerCase() == typeahead.val().toLowerCase()
      }).length > 0

      if (isSuggested) {
        typeahead.siblings('.tt-menu').find('.tt-empty').hide()
      }
    });
  },

  render: function render() {
    return (
      <div className='form-group'>
        <label htmlFor='product[name]'>{"Product's Name"}</label>
        <TypeAhead name='product[name]' value={this.props.value} className='form-control'
          placeholder='Type in the name of the product you’re looking to review, e.g. Hololens'
          bloodhoundProps={this._getBloodhoundProps()} typeaheadProps={this._getTypeaheadProps()}
          onSelectOption={this._onSelectProduct} onSelectNoOption={this._onSelectCreateProduct}
          onChange={this._onNameChange} onRender={this._hideCreateWhenMatch}
          ref='product_name' disabled={this.props.disabled} required/>
        <span className="help-block with-errors"></span>
      </div>
    );
  }
})

export default ProductName;
