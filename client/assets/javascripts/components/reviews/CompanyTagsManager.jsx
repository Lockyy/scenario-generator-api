import React from 'react'
import ReviewPageCompanyFieldsActions from '../../actions/reviews/ReviewPageCompanyFieldsActions'
import TagsManager from '../TagsManager'

const CompanyTagsManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      tags: []
    }
  },

  _setTags: function _setTags(tags) {
    ReviewPageCompanyFieldsActions.setTags(tags);
  },

  render: function render() {
    return (
      <TagsManager tags={this.props.tags} name='product[company[tags]]' onSetTags={this._setTags} />
    );
  }
});

export default CompanyTagsManager;
