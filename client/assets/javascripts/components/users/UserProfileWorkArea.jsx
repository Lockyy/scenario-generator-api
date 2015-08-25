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
          <div className='sidebar-element reviews active'>My Reviews</div>
          <div className='sidebar-element tags'>Followed Tags</div>
          <div className='sidebar-element lists'>Lists</div>
        </div>
        <div className='work-area-content col-xs-10'>
          <RecentActivitySection items={this.props.recent_activity} editable={true} showMessage={true} rows={1} cols={3}/>
        </div>
      </div>
    );
  },
});

export default UserProfileWorkArea;
