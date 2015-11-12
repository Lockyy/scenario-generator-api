import React from 'react';
import _ from 'lodash';
import ReviewBox from './ReviewBox';
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

  getActiveTab: function() {
    let activeTab = this.props.activeTab;
    return _.include(['bookmarks', 'tags', 'reviews', 'collections'], activeTab) ? activeTab : 'reviews';
  },

  isActiveTab: function(type) {
    return this.getActiveTab() == type;
  },

  getCollectionsSection: function getRecentActivitySection() {
    return (
      <div
        className={`my-collections-container work-area-section ${this.isActiveTab('collections') ? '' : 'hide'}`}
        ref='collections' >
        <div className='placeholder-section message'>
          Collections are created by users to group products they are interested.
        </div>
        <CollectionsCollection
          collections={this.props.collections} />
      </div>
    );
  },

  getRecentActivitySection: function getRecentActivitySection() {
    let cols = 3;
    let rows = this.props.page;

    return (
      <div className={`work-area-section ${this.isActiveTab('reviews') ? '' : 'hide'}`}
        ref='recent_activity' >
        <RecentActivitySection sorting={this.props.sorting} items={this.props.recent_activity}
          rows={rows} cols={cols} onChangeSorting={this.props.onChangeSorting}
          onShowMore={this.props.onShowMore} />
      </div>
    );
  },

  onSelectSection: function onSelectSection(e, section) {
    let $el = $(React.findDOMNode(e.target));
    $el.siblings('.active').removeClass('active')
    $el.addClass('active');

    let $section = $(React.findDOMNode(this.refs[section]));
    $section.removeClass('hide')
    $section.siblings('.work-area-section').addClass('hide')
  },

  onSelectActivitySection: function onSelectActivitySection(e) {
    this.onSelectSection(e, 'activity')
  },

  onSelectCollectionsSection: function onSelectCollectionsSection(e) {
    this.onSelectSection(e, 'collections')
  },

  render: function render() {
    return (
      <div id='work-area' className='row'>
        <div className='col-xs-12 col-md-2 work-area-sidebar'>
          <a href='#activity' className={`sidebar-element reviews ${this.isActiveTab('activity') ? 'active' : ''}`}
            onClick={this.onSelectActivitySection}>
            Recent Activity
          </a>
          <a href='#collections' className={`sidebar-element collections ${this.isActiveTab('collections') ? 'active' : ''}`}
            ref='link_collections' onClick={this.onSelectCollectionsSection}>
            Collections
          </a>
        </div>
        <div className='work-area-content col-xs-12 col-md-10' ref='work'>
          {this.getRecentActivitySection()}
          {this.getCollectionsSection()}
        </div>
      </div>
    );
  },

});

export default UserProfileRecentActivity;
