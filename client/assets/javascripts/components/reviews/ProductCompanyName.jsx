import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import ProductName from './ProductName'
import TypeAhead from '../TypeAhead'

const ProductCompanyName  = React.createClass({
  displayName: 'ProductCompanyName',

  getDefaultProps: function getDefaultProps() {
    return {
      value: '',
      disableButton: false
    }
  },

  getValue: function getValue() {
    return React.findDOMNode(this.refs.product_company_name).value
  },

  _getBloodhoundProps: function _getBloodhoundProps() {
    return {
      remote: {
        url: '/api/search?search_string=%QUERY&filter_by=name&match_mode=all',
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
        header: function(data) {
          let query = data.query;
          return `<p class='tt-no-results tt-empty' data-query='${query}'>` +
            `“${query}”<span class='tt-help'>Create company <i class="add-symbol"> + </i></span>` +
            `</p>`;
        },
        empty: function(data) {
          let query = data.query;
          return `<p class='tt-no-results' data-query='${query}'>` +
            `“${query}”<span class='tt-help'>Create company <i class="add-symbol"> + </i></span>` +
            `</p>`;
        },
        suggestion: function(data) {
          let name = data.name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
          return `<p>${name}<span class='tt-help'><i class="review-symbol"> -> </i></span></p>`
        }
      },
    }
  },

  _onCompanyNameChange: function _onCompanyNameChange(company_name) {
    this.props.onSetCompany({ name: company_name, showDetails: false });
  },

  _onSelectCreateCompany: function _onSelectCreateCompany(name) {
    let company = { name: name, showDetails: true }
    this.props.onSetCompany(company);
  },

  _onSelectCompany: function _onSelectCompany(company) {
    this.props.onSetCompany(_.merge({showDetails: false}, company));
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
      <div className='form-group company-name'>
        <label htmlFor='product[company[name]]'>Company Name <span className='required'>*</span></label>
          <TypeAhead name='product[company[name]]' value={this.props.value} placeholder='e.g. Microsoft'
            className='form-control'
            bloodhoundProps={this._getBloodhoundProps()} typeaheadProps={this._getTypeaheadProps()}
            onChange={this._onCompanyNameChange} onRender={this._hideCreateWhenMatch}
            onSelectOption={this._onSelectCompany} onSelectNoOption={this._onSelectCreateCompany}
            ref='product_company_name' required/>
          <span className="help-block with-errors"></span>
      </div>
    );
  }
})

export default ProductCompanyName;
