import React from 'react'
import ReviewPageReviewFieldsActions from '../../actions/reviews/ReviewPageReviewFieldsActions'
import TypeAhead from '../TypeAhead'

const TagsManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      tags: [],
      placeholder: 'Add a tag',
      value: '',
      buttonText: 'Add Tag',
      onAddTag: function(tag) {}
    }
  },
  _validate: function validate(name) {
    let isUnique = !_.find(this.props.tags, function(tag) { return tag.name.toLowerCase() == name.toLowerCase() });
    return name && isUnique;
  },

  _handleAddTag: function _handleAddTag(e) {
    let tag_to_add = React.findDOMNode(this.refs.tag_to_add)
    let name = tag_to_add.value;

    this._buildAndAddTag(name);
  },

  _buildAndAddTag: function _buildAndAddTag(name) {
    let tag = { name: name };

    this._addTag(tag);
  },

  _addTag: function _addTag(tag) {
    let _this = this;

    if(!_this._validate(tag.name)) {
      return ;
    }

    this.props.onAddTag(tag);
    $(React.findDOMNode(_this.refs.tag_to_add.refs.typeahead_input)).typeahead('val', null);
  },

  _getBloodhoundProps: function _getBloodhoundProps() {
    return {
      remote: {
        url: '/api/search?search_string=%QUERY&filter_by=name&match_mode=all',
        wildcard: '%QUERY',
        transform: function(data) { return data.tags.data }
      }
    }
  },

  _getTypeaheadProps: function _getTypeaheadProps() {
    return {
      name: 'tags',
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

  render: function render() {
    return (
      <div className='tags-manager items-manager'>
        <ul className='tags items' ref='tags'>
          {_.map(this.props.tags, function(tag) {
            let id = Math.floor((Math.random() * 1000000) + 1);

            return <li className='tag item' key={`tag_${id}`} id={`tag_${id}`} ref={`tag_${id}`}>
                {tag.name}
            </li>
          })}
        </ul>

        <div className='input-group'>
          <TypeAhead placeholder={this.props.placeholder} className='form-control'
            typeaheadProps={this._getTypeaheadProps()} bloodhoundProps={this._getBloodhoundProps()} name={this.props.name}
            onSelectOption={this._addTag} onSelectNoOption={this._buildAndAddTag}
            ref='tag_to_add'/>

          <div className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this._handleAddTag} >{this.props.buttonText}</button>
          </div>
        </div>
        <span className="help-block with-errors col-xs-12"></span>
      </div>
    );
  }
});

export default TagsManager;
