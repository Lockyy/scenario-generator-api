import React from 'react';
import _ from 'lodash';
import EditReviewBox from './EditReviewBox';
import RecentActivitySection from './RecentActivitySection';

const UserProfileWorkArea  = React.createClass({
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
    return (
      <div id='work-area' className='row'>
        <div className='col-xs-2 work-area-sidebar'>
          <div className='sidebar-element user-reviews active'>My Reviews</div>
          <div className='sidebar-element lists'>Lists</div>
          <div className='sidebar-element custom-data'>Custom Data</div>
        </div>
        <div className='work-area-content col-xs-10'>
          <span>You can browse or edit your reviews at any time, even add or delete files and images.</span>
          <RecentActivitySection items={this.props.recent_activity} rows={2} cols={3}/>
        </div>
      </div>
    );
  },
});

export default UserProfileWorkArea;
