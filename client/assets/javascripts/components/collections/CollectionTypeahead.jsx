import React from 'react';
import _ from 'lodash';
import TypeAhead from '../TypeAhead'
import ResponsivenessHelper from '../../utils/helpers/ResponsivenessHelper.js'

const CollectionTypeahead  = React.createClass({
  displayName: 'CollectionTypeahead',

  getDefaultProps: function getDefaultProps() {
    return {
      value: '',
      disableButton: false
    }
  },

  getValue: function getValue() {
    return React.findDOMNode(this.refs.collection_title).value
  },

  _getBloodhoundProps: function _getBloodhoundProps() {
    return {
      remote: {
        url: '/api/search/collections?search_string=%QUERY',
        wildcard: '%QUERY',
        transform: function(data) { return data.collections.data }
      }
    }
  },

  _getTypeaheadProps: function _getTypeaheadProps() {
    let _this = this
    return {
      name: 'collections',
      displayKey: 'title',
      templates: {
        header: function(data) {
          let query = data.query;
          return `<p class='tt-no-results tt-empty' data-query='${query}'>“${query}”<span class='tt-help'>Add User <i class="add-symbol"> + </i></span></p>`
        },
        empty: function(data) {
          let query = data.query;
          return `<p class='tt-no-results' data-query='${query}'>“${query}”<span class='tt-help'>Add User <i class="add-symbol"> + </i></span></p>`
        },
        suggestion: function(data) {
          let title = data.title.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
          return `<p>${title}<span class='tt-help'>${_this.props.helpMessage || 'Add to Collection'} <i class="review-symbol"> -> </i></span></p>`
        }
      }
    }
  },

  _onNameChange: function _onNameChange(collection_title) {
    this.props._onSelectCollection({ title: collection_title }, false)
  },

  _onSelectCollection: function _onSelectUser(collection) {
    this.props._onSelectCollection(collection, true);
  },

  _scrollToInput: function _scrollToInput() {
    $(window).stop().scrollTo('#collection_title_label', 'slow');
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
        {this.props.hideLabel ? null : (<label id='collection_title_label' htmlFor='collection[title]'>{"Collection's Title"}</label>)}
        <TypeAhead name='collection[title]' value={this.props.value} className='form-control'
          id='collection_title' placeholder='Search collections and add to them'
          bloodhoundProps={this._getBloodhoundProps()} typeaheadProps={this._getTypeaheadProps()}
          onSelectOption={this._onSelectCollection} onChange={this._onNameChange}
          onRender={this._hideCreateWhenMatch} onFocus={this._resizeFormGroup}
          onBlur={this._resizeFormGroupToNormal}
          ref='collection_title' disabled={this.props.disabled} required/>
        <span className="help-block with-errors"></span>
      </div>
    );
  }
});

export default CollectionTypeahead;
