import React from 'react'
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import TypeAhead from '../TypeAhead'

const TagsManager = React.createClass({
  getInitialState: function getInitialState() {
    return {
      tags: []
    };
  },

  _validate: function validate(name) {
    let isUnique = !_.find(this.state.tags, function(tag) { return tag.name.toLowerCase() == name.toLowerCase() });
    return name && isUnique;
  },

  _handleAddTag: function _handleAddTag(e) {
    let tag_to_add = React.findDOMNode(this.refs.product_review_tag_to_add)
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

    FluxReviewPageActions.addTag(tag, {

      success: function(tag) {
        var oldState = _this.state;

        _this.setState(_.merge({}, oldState, {tags: [tag]}, function(a, b) {
          if (_.isArray(a)) { return a.concat(b) }
        }))

        $(React.findDOMNode(_this.refs.product_review_tag_to_add.refs.typeahead_input)).typeahead('val', null);
      }
    });
  },

  getTags: function getTags() {
    let tagsContainer = $(React.findDOMNode(this.refs.tags));

    return _.map(tagsContainer.find('.tag'), function(tag) {
      let $tag = $(tag);

      return {
        name: $tag.find('.tag_name').val()
      }
    });
  },


  _getBloodhoundProps: function _getBloodhoundProps() {
    return {
      remote: {
        url: '/api/search?search=%QUERY&filter_by=name&match_mode=all',
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
          {_.map(this.state.tags, function(tag) {
            let id = Math.floor((Math.random() * 1000000) + 1);

            return <li className='tag item' id={`tag_${id}`} ref={`tag_${id}`}>
                {tag.name}
                <input type='hidden' className='tag_name' name={`review[tags[${id}][name]]`} value={tag.name} />
            </li>
          })}
        </ul>

        <div className='input-group'>
          <TypeAhead  placeholder='Add a tag' className='form-control' value={this.props.value}
            typeaheadProps={this._getTypeaheadProps()} bloodhoundProps={this._getBloodhoundProps()}
            onSelectOption={this._addTag} onSelectNoOption={this._buildAndAddTag}
            ref='product_review_tag_to_add'/>

          <div className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this._handleAddTag} >Add Tag</button>
          </div>
        </div>
        <span className="help-block with-errors col-xs-12"></span>
      </div>
    );
  }
});

export default TagsManager;
