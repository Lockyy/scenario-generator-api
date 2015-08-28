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
      onSetTags: function(tags) {}
    }
  },

  _hideTagsManager: function _hideTagsManager() {
    let $tagsManagerContainer = this._getTagsManagerContainer();
    let $buttonContainer = this._getButtonContainer();

    $tagsManagerContainer.addClass('hide');
    $buttonContainer.removeClass('hide');
  },

  _showTagsManager: function _hideTagsManager() {
    let $tagsManagerContainer = this._getTagsManagerContainer();
    let $buttonContainer = this._getButtonContainer();

    $tagsManagerContainer.removeClass('hide');
    $buttonContainer.addClass('hide');
  },

  _getTagsManagerContainer: function _getTagsManagerContainer() {
    return $(React.findDOMNode(this.refs.tags_manager_container));
  },

  _getButtonContainer: function _getButtonContainer() {
    return $(React.findDOMNode(this.refs.button_container));
  },

  _getTagsManagerInput: function _getTagsManagerInput() {
    return this._getTagsManagerContainer().find('.tags-manager-input');
  },

  _handleCancelAddTags: function _handleCancelAddTags(e) {
    e.preventDefault();

    this._hideTagsManager();
  },

  _handleAddTags: function _handleAddTags(e) {
    e.preventDefault();

    this._hideTagsManager();
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
    let $tagsManagerInput = this._getTagsManagerInput();

    $tagsManagerInput.tagsinput(this._getTagsinputProperties());

    $tagsManagerInput.tagsinput('removeAll');
    _.each(this.props.tags, function(tag) {
      $tagsManagerInput.tagsinput('add', tag);
    });

    $tagsManagerInput.on('beforeItemAdd', function(e) {
      if (_.isString(e.item)) {
        e.cancel = true;

        if (_this._getTagsinputProperties().freeInput) {
          $tagsManagerInput.tagsinput('add', { name: e.item });
          $tagsManagerInput.tagsinput('input').typeahead('close');
          $tagsManagerInput.tagsinput('input').typeahead('val', '');
        }
      }
    });

    $tagsManagerInput.tagsinput('input').keypress(function(e) {
      if ((e.keyCode === 13 || e.key === 'Enter') || (e.keyCode === 44 || e.key === ',')) {
        e.preventDefault();
        $tagsManagerInput.tagsinput('add', e.target.value);
        $tagsManagerInput.tagsinput('input').typeahead('close');
      }
    });

    $tagsManagerInput.tagsinput('focus')
  },

  render: function render() {
    let className = this.props.className || '';

    return (
      <div className={`tags-manager items-manager ${className}`}>
        <div className='tags items' ref='tags'>
          {_.map(this.props.tags, function(tag) {
            let id = Math.floor((Math.random() * 1000000) + 1);

            return <span className='tag item' key={`tag_${id}`} id={`tag_${id}`} ref={`tag_${id}`}>
                {tag.name}
            </span>
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

          <div className='tag-actions'>
            <a className="btn btn-round add" type="button" onClick={this._handleAddTags} href="#">
              Save
            </a>
            <a className="btn btn-white btn-round cancel" onClick={this._handleCancelAddTags} type="button" href="#">
              Cancel
            </a>
          </div>
        </div>
      </div>
    );
  }
});

export default TagsManager;
