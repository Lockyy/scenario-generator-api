import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-router';
import MyTags from '../MyTags'
import FluxCurrentUserActions from '../../actions/FluxCurrentUserActions'
import CurrentUserStore from '../../stores/CurrentUserStore'

const UserTags = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'UserTags',

  contextTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      tags: this.context.currentUser.tags
    }
  },

  getDefaultProps: function() {
    return {
      showTitle: false,
      title: 'My tags',
      showMessage: false,
      message: 'Adding tags will update your News Feed with the latest news from the ones you follow'
    }
  },

  componentDidMount: function() {
    CurrentUserStore.listen(this.onChange);
  },

  onChange: function(data) {
    this.setState(data.data);
  },

  _updateTags: function(tags) {
    FluxCurrentUserActions.updateTags(tags);
  },

  render: function() {
    return (
      <MyTags tags={this.state.tags} onUpdateTags={this._updateTags} {...this.props} />
    )
  }
})

export default UserTags;
