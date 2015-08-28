import React from 'react';
import _ from 'lodash';
import RecentActivitySection from './RecentActivitySection';

const UserProfileWorkArea  = React.createClass({
  displayName: 'UserProfilePage',

  contextTypes: {
    router: React.PropTypes.object,
    currentUser: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      recent_activity: [],
      sorting: 'latest',
      onChangeSorting: function(sorting) {}
    }
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  render: function render() {
    let cols = 3;
    let rows = this.props.page;

    return (
      <div id='work-area' className='row'>
        <div className='col-xs-2 work-area-sidebar'>
          <div className='sidebar-element reviews active'>My Reviews</div>
          <div className='sidebar-element tags'>Followed Tags</div>
          <div className='sidebar-element lists'>Lists</div>
        </div>
        <div className='work-area-content col-xs-10'>
          <RecentActivitySection sorting={this.props.sorting} items={this.props.recent_activity} editable={true}
            showMessage={true} rows={rows} cols={cols}
            onChangeSorting={this.props.onChangeSorting} onShowMore={this.props.onShowMore} />
        </div>
      </div>
    );
  },
});

export default UserProfileWorkArea;
