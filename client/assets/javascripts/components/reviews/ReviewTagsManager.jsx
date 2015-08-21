import React from 'react'
import ReviewPageReviewFieldsActions from '../../actions/reviews/ReviewPageReviewFieldsActions'
import TagsManager from './TagsManager'

const ReviewTagsManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      tags: []
    }
  },

  _addTag: function _addTag(tag) {
    ReviewPageReviewFieldsActions.addTag(tag);
  },

  render: function render() {
    return (
      <TagsManager tags={this.props.tags} name='product[review[tags]]' onAddTag={this._addTag} />
    );
  }
});

export default ReviewTagsManager;
