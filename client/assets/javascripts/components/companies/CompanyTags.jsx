import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import MyTags from '../MyTags'
import FluxCompanyActions from '../../actions/FluxCompanyActions'
import CompanyStore from '../../stores/CompanyStore'

const CompanyTags = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'CompanyTags',

  contextTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      tags: []
    }
  },

  getDefaultProps: function() {
    return {
      showTitle: false,
      title: 'My tags',
      showMessage: false,
      message: 'Adding tags will update your News Feed with the latest news from the ones you follow',
    }
  },

  componentDidMount: function() {
    CompanyStore.listen(this.onChange);
  },

  onChange: function(data) {
    this.setState(data.data);
  },

  _updateTags: function(tags) {
    if (!_.isUndefined(this.props.id))
      FluxCompanyActions.updateCompanyTags(this.props.id, tags);
  },

  render: function() {
    return (
      <MyTags tags={this.state.tags} freeInput={true} onUpdateTags={this._updateTags} {...this.props} />
    )
  }
})

export default CompanyTags;
