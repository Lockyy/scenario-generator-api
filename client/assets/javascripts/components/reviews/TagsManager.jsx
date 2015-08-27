import React from 'react'
import TagsInput from 'bootstrap-tagsinput'
import ReviewPageReviewFieldsActions from '../../actions/reviews/ReviewPageReviewFieldsActions'
import TypeAhead from '../TypeAhead'
import Bloodhound from 'typeahead.js/dist/bloodhound';

const TagsManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      tags: [],
      placeholder: 'Start typing to add a tag',
      value: '',
      buttonText: 'Add / Edit Tags',
      onAddTag: function(tag) {}
    }
  },

  _handleAddTags: function _handleAddTags(e) {
    e.preventDefault();

    let _this = this;
    let $tagsManagerContainer = $(React.findDOMNode(this.refs.tags_manager_container));
    let $buttonContainer = $(React.findDOMNode(this.refs.button_container));

    $tagsManagerContainer.addClass('hide');
    $buttonContainer.removeClass('hide');

    let $tagsManagerInput = $tagsManagerContainer.find('.tags-manager-input');
    this.props.onSetTags($tagsManagerInput.tagsinput('items'));
  },

  _getBloodhoundProps: function _getBloodhoundProps() {
    return {
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: '/api/search?search_string=%QUERY&filter_by=name&match_mode=all',
        wildcard: '%QUERY',
        transform: function(data) { return data.tags.data }
      }
    }
  },

  _getTypeaheadProps: function _getTypeaheadProps() {
    let ds = new Bloodhound(this._getBloodhoundProps());

    return _.merge({
      name: 'tags',
      displayKey: 'name',
      source: ds.ttAdapter(),
      templates: {
        suggestion: function(data) {
          return `<p>${data.name}</p>`
        }
      }
    });
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

  _onPressEnter: function _onPressEnter(e) {
    e.preventDefault();
  },

  _showTagsManager: function _showTagsManager(e) {
    e.preventDefault();

    let $buttonContainer = $(React.findDOMNode(this.refs.button_container));
    $buttonContainer.addClass('hide');

    let $tagsManagerContainer = $(React.findDOMNode(this.refs.tags_manager_container));
    $tagsManagerContainer.removeClass('hide');

    let $tagsManagerInput = $tagsManagerContainer.find('.tags-manager-input');

    $tagsManagerInput.tagsinput({
      freeInput: true,
      itemValue: function(item) { return item.name },
      itemText: function(item) { return item.name },
      tagClass: 'item tag',
      trimValue: true,
      typeaheadjs: this._getTypeaheadProps()
    });

    _.each(this.props.tags, function(tag) {
      $tagsManagerInput.tagsinput('add', tag);
    });

    $tagsManagerInput.on('beforeItemAdd', function(e) {
      if (_.isString(e.item)) {
        e.cancel = true;
        $tagsManagerInput.tagsinput('add', { name: e.item });
        $tagsManagerInput.tagsinput('input').typeahead('close');
        $tagsManagerInput.tagsinput('input').typeahead('val', '');
      }
    });

    $tagsManagerInput.tagsinput('input').on('keypress', function(e) {
      debugger;
      if (e.keyCode === 13 || e.keyCode === 44) {
        e.preventDefault();
        $tagsManagerInput.tagsinput('add', e.target.value);
        $tagsManagerInput.tagsinput('input').typeahead('close');
      }
    });

    $tagsManagerInput.tagsinput('focus')
  },

  render: function render() {
    return (
      <div className='tags-manager items-manager'>
        <div className='tags items' ref='tags'>
          {_.map(this.props.tags, function(tag) {
            let id = Math.floor((Math.random() * 1000000) + 1);

            return <span className='tag item' key={`tag_${id}`} id={`tag_${id}`} ref={`tag_${id}`}>
                {tag.name}
            </span>
          })}
        </div>

        <div className='button-container' ref='button_container'>
          <a className="btn btn-white btn-round" type="button" onClick={this._showTagsManager} href="#">
            {this.props.buttonText}
          </a>
        </div>

        <div className='input-group tags-manager-container hide' ref='tags_manager_container'>
          <span className='title'>Add Tags</span>

          <input type='text' className='form-control tags-manager-input' placeholder={this.props.placeholder}
            required />

          <div className='tag-actions'>
            <a className="btn btn-round add" type="button" onClick={this._handleAddTags} href="#">
              Add / Edit
            </a>
            <a className="btn btn-white btn-round cancel" type="button" href="#">
              Cancel
            </a>
          </div>
        </div>
      </div>
    );
  }
});

export default TagsManager;
