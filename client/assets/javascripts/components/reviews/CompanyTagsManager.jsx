import React from 'react'
import ReviewPageCompanyFieldsActions from '../../actions/reviews/ReviewPageCompanyFieldsActions'
import TagsManager from './TagsManager'

const CompanyTagsManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      tags: []
    }
  },

  _addTag: function _addTag(tag) {
    ReviewPageCompanyFieldsActions.addTag(tag);
  },

  render: function render() {
    return (
      <TagsManager tags={this.props.tags} name='product[company[tags]]' onAddTag={this._addTag} />
    );
  }
});

export default CompanyTagsManager;
