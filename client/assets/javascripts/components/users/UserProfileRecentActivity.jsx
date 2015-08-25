import React from 'react';
import _ from 'lodash';
import ReviewBox from './ReviewBox';
import RecentActivitySection from './RecentActivitySection';

const UserProfilePage  = React.createClass({
  displayName: 'UserProfilePage',

  contextTypes: {
    router: React.PropTypes.object,
    currentUser: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      recent_activity: []
    }
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  render: function render() {
    let recent_activity  = _.map(this.props.recent_activity, function(activity) {
      return (<ReviewBox key={activity.id} {...activity}/>);
    });

    return (
      <div id='recent-activity'>
        <RecentActivitySection items={this.props.recent_activity} rows={1} cols={4}/>
      </div>
    );
  },
});

export default UserProfilePage;
