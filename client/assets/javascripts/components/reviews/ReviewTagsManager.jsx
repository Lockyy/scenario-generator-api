import React from 'react'
import ReviewPageReviewFieldsActions from '../../actions/reviews/ReviewPageReviewFieldsActions'
import TagsManager from './TagsManager'

const ReviewTagsManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      tags: []
    }
  },

  _setTags: function _setTags(tags) {
    ReviewPageReviewFieldsActions.setTags(tags);
  },

  render: function render() {
    return (
      <TagsManager tags={this.props.tags} name='product[review[tags]]' onSetTags={this._setTags} />
    );
  }
});

export default ReviewTagsManager;
