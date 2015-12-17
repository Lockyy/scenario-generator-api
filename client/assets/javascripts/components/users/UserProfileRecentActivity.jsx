import React from 'react';
import _ from 'lodash';
import ReviewBox from './ReviewBox';
import TabbedArea from '../TabbedArea';
import CollectionsCollection from '../collections/CollectionsCollection';
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
      onChangeSorting: function(sorting) {},
      collections: []
    }
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  getCollectionsSection: function getRecentActivitySection() {
    return (
      <div
        className={`my-collections-container work-area-section`}
        ref='collections'
        tabTitle='Collections' >
        <div className='placeholder-section message'>
          Collections are created by users to group products they are interested.
        </div>
        <CollectionsCollection
          className='hidden-xs'
          emptyMessage='This user does not collaborate on any collections.' />
        <CollectionsCollection
          mobile="true"
          className='horizontal-padding-2 visible-xs'
          emptyMessage='This user does not collaborate on any collections.' />
      </div>
    );
  },

  getRecentActivitySection: function getRecentActivitySection() {
    let cols = 3;
    let rows = this.props.page;

    return (
      <div className={`work-area-section`}
        ref='recent_activity'
        tabTitle='Recent Activity' >
        <RecentActivitySection sorting={this.props.sorting} items={this.props.recent_activity}
          rows={rows} cols={cols} onChangeSorting={this.props.onChangeSorting}
          onShowMore={this.props.onShowMore} />
      </div>
    );
  },

  render: function render() {
    return (
      <TabbedArea>
        {this.getRecentActivitySection()}
        {this.getCollectionsSection()}
      </TabbedArea>
    );
  },

});

export default UserProfileRecentActivity;
