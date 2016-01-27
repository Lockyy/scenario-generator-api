import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-router'
import FluxUserActions from '../../actions/FluxUserActions';
import FluxBookmarkActions from '../../actions/FluxBookmarkActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions';
import UserStore from '../../stores/UserStore';
import UrlHelper from '../../utils/helpers/UrlHelper'
import Section from '../Section'
import SectionRow from '../SectionRow'
import UserProfileHeader from './UserProfileHeader';
import UserProfileRecentActivity from './UserProfileRecentActivity';
import UserProfileWorkArea from './UserProfileWorkArea';

const UserProfilePage  = React.createClass({
  displayName: 'UserProfilePage',
  mixins: [ Navigation ],

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
      sorting: 'latest'
    }
  },

  componentDidMount() {
    UserStore.listen(this.onChange);
    FluxUserActions.fetchData(this.context.router.state.params.userId, function() {
      this.transitionTo('/app')
      FluxNotificationsActions.showNotification({
        type: '404',
        text: `That user does not exist`
      })
    }.bind(this));
    FluxUserActions.fetchRecentActivity(this.context.router.state.params.userId);
  },

  componentWillReceiveProps(newProps) {
    if(newProps.params.userId != this.context.router.state.params.userId) {
      FluxUserActions.fetchData(newProps.params.userId, function() {
        this.transitionTo('/app')
        FluxNotificationsActions.showNotification({
          type: '404',
          text: `That user does not exist`
        })
      }.bind(this));
    }
    FluxUserActions.fetchRecentActivity(newProps.params.userId);
  },

  onChange(data) {
    this.setState(function(oldData) {
      let newData = _.merge({}, oldData, data.data, function(a, b, property) {
        if (_.isArray(a)) {
          // If the property being merged is recent activity we need
          // to concatinate the arrays and remove non-unique elements.
          // This is so that the show more button properly appends them.
          if(property == 'recent_activity') {
            return _.uniq(a.concat(b), function(obj) {
              return (typeof a[0] === 'object') ? obj.id : obj;
            })
          // Everything else is entirely new data and should just return the new array.
          } else {
            return b
          }
        }
      });

      if (data.data.sorting && data.data.sorting != oldData.sorting ) {
        newData.recent_activity = data.data.recent_activity
      }

      return newData;
    });
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  getPaginationParams: function getPaginationParams() {
    return { sorting: this.state.sorting, per_page: this.state.per_page };
  },

  onChangeReviewsSorting: function onChangeReviewsSorting(sorting) {
    let paginationParams = _.merge(this.getPaginationParams(), {sorting: sorting, page: 1});
    FluxUserActions.fetchRecentActivity(this.context.router.state.params.userId, paginationParams);
  },

  onShowMoreReviews: function onShowMoreReviews(page, per_page) {
    let paginationParams = _.merge(this.getPaginationParams(), {page: page, per_page: per_page});
    FluxUserActions.fetchRecentActivity(this.context.router.state.params.userId, paginationParams);
  },

  render: function render() {
    let user  = this.state;

    let page = user.id == this.context.currentUser.id ?
      <UserProfileWorkArea sorting={this.state.sorting}
        onChangeSorting={this.onChangeReviewsSorting} onShowMore={this.onShowMoreReviews} {...user} /> :
      <UserProfileRecentActivity sorting={this.state.sorting}
        onShowMore={this.onShowMoreReviews} onChangeSorting={this.onChangeReviewsSorting} {...user}/>

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
