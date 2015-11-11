import React from 'react';
import _ from 'lodash';
import RecentActivitySection from './RecentActivitySection';
import TabbedArea from '../TabbedArea';
import UserTags from './UserTags';
import UserBookmarks from './UserBookmarks';
import CollectionsCollection from '../collections/CollectionsCollection';
import { CreateCollectionMixin } from '../collections/CreateCollectionModal'

const UserProfileWorkArea  = React.createClass({
  displayName: 'UserProfileWorkArea',
  mixins: [CreateCollectionMixin],

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

  getActiveTab: function() {
    let activeTab = this.props.activeTab;
    return _.include(['bookmarks', 'tags', 'reviews', 'collections'], activeTab) ? activeTab : 'reviews';
  },

  isActiveTab: function(type) {
    return this.getActiveTab() == type;
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  getCollectionsSection: function getRecentActivitySection() {
    return (
      <div
        className='my-collections-container work-area-section'
        ref='collections'
        tabTitle='Collections' >
        <div className='placeholder-section message'>
          Collections are created by users to group products they are interested. They can even be shared or made public. Create one yourself!
        </div>
        <div className='btn btn-round btn-red' onClick={this.showCreateCollectionModal}>
          Create Collection
        </div>
        <CollectionsCollection />
      </div>
    );
  },

  getRecentActivitySection: function getRecentActivitySection() {
    let cols = 3;
    let rows = this.props.page;

    return (
      <RecentActivitySection containerClass='work-area-section'
        sorting={this.props.sorting}
        items={this.props.recent_activity} editable={true} showMessage={true} rows={rows} cols={cols}
        onChangeSorting={this.props.onChangeSorting} onShowMore={this.props.onShowMore} ref='reviews'
        tabTitle='My Reviews' />
    );
  },

  getTagsSection: function getTagsSection() {
    return (
      <div className='my-tags-container work-area-section' ref='tags' tabTitle='Followed Tags' >
        <UserTags showMessage='true' />
      </div>
    );
  },

  getBookmarksSection: function getBookmarksSection() {
    return (
      <div className='my-bookmarks-container work-area-section' ref='bookmarks' tabTitle='Bookmarks' >
        <UserBookmarks showMessage='true' />
      </div>
    );
  },

  render: function render() {
    return (
      <TabbedArea>
        {this.getRecentActivitySection()}
        {this.getTagsSection()}
        {this.getBookmarksSection()}
        {this.getCollectionsSection()}
      </TabbedArea>
    );
  },
});

export default UserProfileWorkArea;
