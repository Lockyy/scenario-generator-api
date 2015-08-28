import React from 'react';
import _ from 'lodash';
import ReviewBox from './ReviewBox';
import RecentActivitySection from './RecentActivitySection';

const UserProfileRecentActivity  = React.createClass({
  displayName: 'UserProfilePage',

  contextTypes: {
    router: React.PropTypes.object,
    currentUser: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      sorting: 'latest',
      recent_activity: [],
      onChangeSorting: function(sorting) {}
    }
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  render: function render() {
    let cols = 4;
    let rows = this.props.page;

    return (
      <div id='recent-activity'>
        <RecentActivitySection sorting={this.props.sorting} items={this.props.recent_activity} rows={rows} cols={cols}
          onChangeSorting={this.props.onChangeSorting} onShowMore={this.props.onShowMore} />
      </div>
    );
  },
});

export default UserProfileRecentActivity;
