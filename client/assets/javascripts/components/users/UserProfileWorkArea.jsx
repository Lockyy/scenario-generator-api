import React from 'react';
import _ from 'lodash';
import RecentActivitySection from './RecentActivitySection';
import UserTags from './UserTags';
import UserBookmarks from './UserBookmarks';

const UserProfileWorkArea  = React.createClass({
  displayName: 'UserProfileWorkArea',

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
    return _.include(['bookmarks', 'tags', 'reviews'], activeTab) ? activeTab : 'reviews';
  },

  isActiveTab: function(type) {
    return this.getActiveTab() == type;
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  getRecentActivitySection: function getRecentActivitySection() {
    let cols = 3;
    let rows = this.props.page;

    return (
      <RecentActivitySection containerClass={`work-area-section ${this.isActiveTab('reviews') ? '' : 'hide'}`}
        sorting={this.props.sorting}
        items={this.props.recent_activity} editable={true} showMessage={true} rows={rows} cols={cols}
        onChangeSorting={this.props.onChangeSorting} onShowMore={this.props.onShowMore} ref='reviews' />
    );
  },

  getTagsSection: function getTagsSection() {
    return (
      <div className={`my-tags-container work-area-section ${this.isActiveTab('tags') ? '' : 'hide'}`} ref='tags' >
        <UserTags showMessage='true' />
      </div>
    );
  },

  getBookmarksSection: function getBookmarksSection() {
    return (
      <div className={`my-bookmarks-container work-area-section ${this.isActiveTab('bookmarks') ? '' : 'hide'}`} ref='bookmarks' >
        <UserBookmarks showMessage='true' />
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

  onSelectReviewsSection: function onSelectReviewsSection(e) {
    this.onSelectSection(e, 'reviews')
  },

  onSelectTagsSection: function onSelectTagsSection(e) {
    this.onSelectSection(e, 'tags')
  },

  onSelectBookmarksSection: function onSelectBookmarksSection(e) {
    this.onSelectSection(e, 'bookmarks')
  },

  render: function render() {
    return (
      <div id='work-area' className='row'>
        <div className='col-xs-12 col-md-2 work-area-sidebar'>
          <a href='#activity' className={`sidebar-element reviews ${this.isActiveTab('reviews') ? 'active' : ''}`}
            ref='link_reviews' onClick={this.onSelectReviewsSection}>
            My Reviews
          </a>
          <a href='#tags' ref='link_tags' className={`sidebar-element tags ${this.isActiveTab('tags') ? 'active' : ''}`}
            onClick={this.onSelectTagsSection}>
            Followed Tags
          </a>
          <a href='#bookmarks' className={`sidebar-element bookmarks ${this.isActiveTab('bookmarks') ? 'active' : ''}`}
            ref='link_bookmarks' onClick={this.onSelectBookmarksSection}>
            Bookmarks
          </a>
        </div>
        <div className='work-area-content col-xs-12 col-md-10' ref='work'>
          {this.getRecentActivitySection()}
          {this.getTagsSection()}
          {this.getBookmarksSection()}
        </div>
      </div>
    );
  },
});

export default UserProfileWorkArea;
