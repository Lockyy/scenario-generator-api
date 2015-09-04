import React from 'react';
import _ from 'lodash';
import FluxUserActions from '../../actions/FluxUserActions';
import FluxBookmarkActions from '../../actions/FluxBookmarkActions';
import UserStore from '../../stores/UserStore';
import Section from '../Section'
import SectionRow from '../SectionRow'
import UserProfileHeader from './UserProfileHeader';
import UserProfileRecentActivity from './UserProfileRecentActivity';
import UserProfileWorkArea from './UserProfileWorkArea';

const UserProfilePage  = React.createClass({
  displayName: 'UserProfilePage',

  contextTypes: {
    router: React.PropTypes.object,
    currentUser: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      id: '',
      name: '',
      avatar_url: '',
      job_title: '',
      sort_by: 'latest'
    }
  },

  componentDidMount() {
    UserStore.listen(this.onChange);
    FluxUserActions.fetchData(this.context.router.state.params.userId);
    FluxUserActions.fetchRecentActivity(this.context.router.state.params.userId);
  },

  onChange(data) {
    this.setState(function(oldData) {
      let newData = _.merge({}, oldData, data.data, function(a, b) {
        if (_.isArray(a)) {
          return _.unique(a.concat(b), function(obj) {
            return (typeof a[0] === 'object') ? obj.id : obj;
          })
        }
      });

      if (data.data.sort_by && data.data.sort_by != oldData.sort_by ) {
        newData.recent_activity = data.data.recent_activity
      }

      return newData;
    });
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  getPaginationParams: function getPaginationParams() {
    return { sort_by: this.state.sort_by, per_page: this.state.per_page };
  },

  onChangeReviewsSorting: function onChangeReviewsSorting(sort_by) {
    let paginationParams = _.merge(this.getPaginationParams(), {sort_by: sort_by, page: 1});
    FluxUserActions.fetchRecentActivity(this.context.router.state.params.userId, paginationParams);
  },

  onShowMoreReviews: function onShowMoreReviews(page, per_page) {
    let paginationParams = _.merge(this.getPaginationParams(), {page: page, per_page: per_page});
    FluxUserActions.fetchRecentActivity(this.context.router.state.params.userId, paginationParams);
  },

  render: function render() {
    let user  = this.state;

    let page = user.id == this.context.currentUser.id ?
      <UserProfileWorkArea sorting={this.state.sort_by}
        onChangeSorting={this.onChangeReviewsSorting} onShowMore={this.onShowMoreReviews} {...user} /> :
      <UserProfileRecentActivity sorting={this.state.sort_by} onShowMore={this.onShowMoreReviews}
        onChangeSorting={this.onChangeReviewsSorting} {...user}/>

    return (
    <div className='user profile show'>
      <div className='main-content'>
        <h1 className='title'>{user.name ? user.name.split(' ')[0] : 'User' }{"'s Profile"}</h1>
        <UserProfileHeader {...user}/>
        {page}
      </div>
    </div>
    );
  },
});

export default UserProfilePage;
