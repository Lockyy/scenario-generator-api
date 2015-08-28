import React from 'react'
import TagsInput from 'bootstrap-tagsinput'
import Bloodhound from 'typeahead.js/dist/bloodhound';

const TagsManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      tags: [],
      placeholder: 'Start typing to add a tag',
      value: '',
      buttonText: 'Add / Edit Tags',
      itemClass: 'tagSuggestion',
      tagsinputProperties: {},
      addLink: true,
      onSetTags: function(tags) {}
    }
  },

  _hideButtonContainer: function _hideButtonContainer() {
    let $buttonContainer = this._getButtonContainer();
    $buttonContainer.addClass('hide');
  },

  _showButtonContainer: function _showButtonContainer() {
    let $buttonContainer = this._getButtonContainer();
    $buttonContainer.removeClass('hide');
  },

  _hideTagsItems: function _hideTagsItems() {
    let $tagsItems = this._getTagsItems();
    $tagsItems.addClass('hide');
  },

  _showTagsItems: function _showTagsItems() {
    let $tagsItemsContainer = this._getTagsItems();
    $tagsItemsContainer.removeClass('hide');
  },

  _hideTagsManager: function _hideTagsManager() {
    let $tagsManagerContainer = this._getTagsManagerContainer();
    $tagsManagerContainer.addClass('hide');
  },

  _showTagsManager: function _hideTagsManager() {
    let $tagsManagerContainer = this._getTagsManagerContainer();
    $tagsManagerContainer.removeClass('hide');
  },

  _getButtonContainer: function _getButtonContainer() {
    return $(React.findDOMNode(this.refs.button_container));
  },

  _getTagsManagerContainer: function _getTagsManagerContainer() {
    return $(React.findDOMNode(this.refs.tags_manager_container));
  },

  _getTagsItems: function _getTagsItems() {
    return $(React.findDOMNode(this.refs.tags));
  },

  _getTagsManagerInput: function _getTagsManagerInput() {
    return this._getTagsManagerContainer().find('.tags-manager-input');
  },

  _handleCancelAddTags: function _handleCancelAddTags(e) {
    e.preventDefault();

    this._hideTagsManager();
  },

  _handleAddTags: function _handleAddTags() {
    this.props.onSetTags(this._getTagsManagerInput().tagsinput('items'));
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
    let _this = this;

    return _.merge({
      name: 'tags',
      displayKey: 'name',
      source: ds.ttAdapter(),
      templates: {
        suggestion: function(data) {
          return `<p class='${_this.props.itemClass}'>${data.name}</p>`
        }
      }
    });
  },

  _getTagsinputProperties: function _getTagsinputProperties() {
    return _.merge({
      itemValue: function(item) { return item.name },
      itemText: function(item) { return item.name },
      freeInput: true,
      tagClass: 'item tag',
      trimValue: true,
      typeaheadjs: this._getTypeaheadProps()
    }, this.props.tagsinputProperties);
  },

  _onPressEnter: function _onPressEnter(e) {
    e.preventDefault();
  },

  _enableTagsManager: function _enableTagsManager(e) {
    e.preventDefault();

    let _this = this;

    this._showTagsManager();
    this._hideTagsItems();
    this._hideButtonContainer();

    let $tagsManagerInput = this._getTagsManagerInput();

    $tagsManagerInput.tagsinput(this._getTagsinputProperties());

    _.each(this.props.tags, function(tag) {
      $tagsManagerInput.tagsinput('add', tag);
    });

    $tagsManagerInput.on('beforeItemAdd', function(e) {
      if (_.isString(e.item)) {
        e.cancel = true;

        if (_this._getTagsinputProperties().freeInput) {
          $tagsManagerInput.tagsinput('add', { name: e.item.toLowerCase() });
          $tagsManagerInput.tagsinput('input').typeahead('close');
          $tagsManagerInput.tagsinput('input').typeahead('val', '');
        }
      }
    });

    $tagsManagerInput.on('itemAdded', function(e) {
      _this._handleAddTags();
    });

    $tagsManagerInput.on('itemRemoved', function(e) {
      _this._handleAddTags();
    });

    $tagsManagerInput.tagsinput('input').keypress(function(e) {
      if (e.keyCode === 13 || e.key === 'Enter') {
        e.preventDefault();
        $tagsManagerInput.tagsinput('add', e.target.value);
        $tagsManagerInput.tagsinput('input').typeahead('close');
      }
    });

    $tagsManagerInput.tagsinput('input').on('blur', function(e) {
      _this._hideTagsManager();
      _this._showTagsItems();
      _this._showButtonContainer();
    });

    $tagsManagerInput.tagsinput('focus');
  },

  render: function render() {
    let className = this.props.className || '';

    return (
      <div className={`tags-manager items-manager ${className}`}>
        <div className='tags items' ref='tags'>
          {_.map(this.props.tags, function(tag) {
            let id = Math.floor((Math.random() * 1000000) + 1);
            let url = `/app/tags/${tag.slug}/1`;
            return <a href={url}>
              <span className='tag item' key={`tag_${id}`} id={`tag_${id}`} ref={`tag_${id}`}>{tag.name}</span>
              </a>
          })}
        </div>

        <div className='button-container' ref='button_container'>
          <a className="btn btn-white btn-round" type="button" onClick={this._enableTagsManager} href="#">
            {this.props.buttonText}
          </a>
        </div>

        <div className='input-group tags-manager-container hide' ref='tags_manager_container'>
          <span className='title'>Add Tags</span>

          <input type='text' className='form-control tags-manager-input' placeholder={this.props.placeholder}
            required />
        </div>
      </div>
    );
  }
});

export default TagsManager;
