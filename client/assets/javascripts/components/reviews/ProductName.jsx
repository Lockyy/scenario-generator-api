import React from 'react';
import _ from 'lodash';
import TypeAhead from '../TypeAhead'
import ResponsivenessHelper from '../../utils/helpers/ResponsivenessHelper.js'

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

  _getEmptyTemplate: function _getEmptyTemplate() {
    if(this.props.noEmptySubmit) {
      return function(data) {
        let query = data.query;
        return `<p class='tt-no-results' data-query='${query}'>No Results for “${query}”</p>`
      }
    } else {
      return function(data) {
        let query = data.query;
        return `<p class='tt-no-results' data-query='${query}'>“${query}”<span class='tt-help'>Add and Review <i class="add-symbol"> + </i></span></p>`
      }
    }
  },

  _getHeaderTemplate: function _getEmptyTemplate() {
    if(this.props.noEmptySubmit) {
      return
    } else {
      return function(data) {
        let query = data.query;
        return `<p class='tt-no-results tt-empty' data-query='${query}'>“${query}”<span class='tt-help'>Add and Review <i class="add-symbol"> + </i></span></p>`
      }
    }
  },

  _getTypeaheadProps: function _getTypeaheadProps() {
    let _this = this
    return {
      name: 'products',
      displayKey: 'name',
      templates: {
        header: _this._getHeaderTemplate(),
        empty: _this._getEmptyTemplate(),
        suggestion: function(data) {
          let name = data.name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
          return `<p>${name}<span class='tt-help'>${_this.props.helpMessage || 'Review'} <i class="review-symbol"> -> </i></span></p>`
        }
      }
    }
  },

  _onNameChange: function _onNameChange(product_name) {
    this.props.onSetProduct({ name: product_name }, false)
  },

  _onSelectProduct: function _onSelectProduct(product) {
    this.props.onSetProduct(product, true);
  },

  _onSelectCreateProduct: function _onSelectCreateProduct(name) {
    if(this.props.noEmptySubmit) {
      return
    }
    let product = { name: name };
    this.props.onSetProduct(product, true);
  },

  _scrollToInput: function _scrollToInput() {
    $(window).stop().scrollTo('#product_name_label', 'slow');
  },

  _hideCreateWhenMatch: function _hideCreateWhenMatch(e) {
    let typeahead = $(e.target);

    typeahead.on("typeahead:render", function() {
      if (arguments.length < 2) return;

      let suggestions = _.takeRight(arguments, arguments.length - 1);
      let isSuggested = _.filter(suggestions, function(suggestion) {
        return suggestion.name && typeahead.val() && suggestion.name.toLowerCase() == typeahead.val().toLowerCase()
      }).length > 0;

      if (isSuggested) {
        typeahead.siblings('.tt-menu').find('.tt-empty').hide()
      }
    });
  },

  _resizeFormGroup: function _resizeFormGroup(e) {
    if (ResponsivenessHelper.isMobile()) {
      let $el = $(e.target);

      $el.parents('.form-group').css({'minHeight': '800px', 'marginBottom': '-675px'});
      this._scrollToInput();
    }
  },

  _resizeFormGroupToNormal: function _resizeFormGroupToNormal(e) {
    if (ResponsivenessHelper.isMobile()) {
      let $el = $(e.target);
      $el.parents('.form-group').css({'minHeight': '0', 'marginBottom': '50px'})
    }
  },

  render: function render() {
    return (
      <div className='form-group typeahead'>
        {this.props.hideLabel ? null : (<label id='product_name_label' htmlFor='product[name]'>{"Product's Name"}</label>)}
        <TypeAhead name='product[name]' value={this.props.value} className='form-control'
          id='product_name' placeholder='Type in the name of the product'
          bloodhoundProps={this._getBloodhoundProps()} typeaheadProps={this._getTypeaheadProps()}
          onSelectOption={this._onSelectProduct} onSelectNoOption={this._onSelectCreateProduct}
          onChange={this._onNameChange} onRender={this._hideCreateWhenMatch} onFocus={this._resizeFormGroup}
          onBlur={this._resizeFormGroupToNormal}
          ref='product_name' disabled={this.props.disabled} required/>
        <span className="help-block with-errors"></span>
      </div>
    );
  }
});

export default ProductName;
