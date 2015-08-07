import React from 'react'
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'

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

    if(!this._validate(name)) {
      return ;
    }

    let tag = { name: name };
    var _this = this;

    FluxReviewPageActions.addTag(tag, {
      success: function(tag) {
        var oldState = _this.state;

        _this.setState(_.merge({}, oldState, {tags: [tag]}, function(a, b) {
          if (_.isArray(a)) { return a.concat(b) }
        }))

        React.findDOMNode(_this.refs.product_review_tag_to_add).value = null;
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

  render: function render() {
    return (
      <div className='tags-manager items-manager'>
        <ul className='tags items' ref='tags'>
          {_.map(this.state.tags, function(tag) {
            let id = Math.floor((Math.random() * 1000000) + 1);

            return <li className='tag' id={`tag_${id}`} ref={`tag_${id}`}>
              <div className=''>
                <input type='hidden' className='tag_name' name={`review[tags[${id}][name]]`} value={tag.name} />
                {tag.name}
              </div>
            </li>
          })}
        </ul>

        <div className='input-group'>
          <input type='text' className='form-control' placeholder='Add a tag' name='product[review[tag]]'
            title="Include a name" ref='product_review_tag_to_add'/>

          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this._handleAddTag} >Add Tag</button>
          </span>
        </div>
        <span className="help-block with-errors col-xs-12"></span>
      </div>
    );
  }
});

export default TagsManager;
