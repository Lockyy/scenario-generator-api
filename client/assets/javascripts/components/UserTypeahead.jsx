import React from 'react';
import _ from 'lodash';
import TypeAhead from './TypeAhead'
import ResponsivenessHelper from '../utils/helpers/ResponsivenessHelper.js'

const UserTypeahead  = React.createClass({
  displayName: 'UserTypeahead',

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
        url: '/api/v1/search/users?search_string=%QUERY',
        wildcard: '%QUERY',
        transform: function(data) { return data.users.data }
      }
    }
  },

  _getTypeaheadProps: function _getTypeaheadProps() {
    let _this = this
    return {
      name: 'users',
      displayKey: 'name',
      templates: {
        header: _this._getHeaderTemplate,
        empty: function(data) {
          let query = data.query;
          if(_this._validateJLLEmail(query)) {
            return `<p class='tt-no-results tt-empty' data-query='${query}'>“${query}”<span class='tt-help'>Invite via email <i class="add-symbol"> + </i></span></p>`
          }
          if(_this._validateEmail(query)) {
            return (
              `<p class='tt-no-results tt-empty' data-query='${query}'>
                “${query}”
                <span class='tt-help'>
                  Not a valid email domain
                  <span class='hover-tooltip'>
                    <span class='tooltip'>
                      <b>You will only be able to add users whose email domains have been registered in Fletcher.</b>
                      The following domains have been registered: @am.jll.com<br>@eu.jll.com<br>@ap.jll.com<br>@jll.com
                    </span>
                  </span>
                </span>
              </p>`
            )
          }
          return `<p class='tt-no-results' data-query='${query}'>No Results for “${query}”</p>`
        },
        suggestion: function(data) {
          let name = data.name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
          return `<p>${name}<span class='tt-help'>${_this.props.helpMessage || 'Add User'} <i class="review-symbol"> -> </i></span></p>`
        }
      }
    }
  },

  _onNameChange: function _onNameChange(user_name) {
    this.props.onSetUser({ name: user_name }, false)
  },

  _onSelectUser: function _onSelectUser(user) {
    if(user.id) {
      this.props.onSetUser(user, true);
    }
  },

  _onSelectEmail: function _onSelectEmail(query) {
    if(this._validateJLLEmail(query)) {
      this.props.onSetEmail(query)
    }
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

  _validateJLLEmail: function _validateJLLEmail(email) {
    var re = /\b\S+@{1}(am\.|eu\.|ap\.)?jll\.com\b/;
    return re.test(email);
  },

   _validateEmail: function _validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  },

  _getHeaderTemplate: function _getHeaderTemplate(data) {
    let query = data.query;
    if(this._validateEmail(query)) {
      return `<p class='tt-no-results tt-empty' data-query='${query}'>“${query}”<span class='tt-help'>Invite via email <i class="add-symbol"> + </i></span></p>`
    }
    return
  },

  render: function render() {
    return (
      <div className='form-group typeahead'>
        {this.props.hideLabel ? null : (<label id='product_name_label' htmlFor='user[name]'>{"User's Name"}</label>)}
        <TypeAhead name='user[name]' value={this.props.value} className='form-control'
          id='user_name' placeholder={this.props.placeholder || 'Search users, or enter their emails'}
          bloodhoundProps={this._getBloodhoundProps()} typeaheadProps={this._getTypeaheadProps()}
          onSelectOption={this._onSelectUser} onSelectNoOption={this._onSelectEmail}
          onChange={this._onNameChange} onRender={this._hideCreateWhenMatch}
          onFocus={this._resizeFormGroup} onBlur={this._resizeFormGroupToNormal}
          ref='user_name' disabled={this.props.disabled} required/>
        <span className="help-block with-errors"></span>
      </div>
    );
  }
});

export default UserTypeahead;
