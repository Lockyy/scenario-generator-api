import React from 'react';
import _ from 'lodash';
import FluxUserActions from '../../actions/FluxUserActions';
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
      job_title: ''
    }
  },

  componentDidMount() {
    UserStore.listen(this.onChange);
    FluxUserActions.fetchData(this.context.router.state.params.userId);
    FluxUserActions.fetchRecentActivity(this.context.router.state.params.userId);
  },

  onChange(data) {
    this.setState(function(oldData) {
      data: _.merge(oldData, data.data);
    });
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  onChangeReviewsSorting: function onChangeReviewsSorting(sorting) {
    this.setState({ sorting: sorting });
    FluxUserActions.fetchRecentActivity(this.context.router.state.params.userId, { sort_by: sorting });
  },

  render: function render() {
    let user  = this.state;

    let page = user.id == this.context.currentUser.id ?
      <UserProfileWorkArea sorting={this.props.sorting} onChangeSorting={this.onChangeReviewsSorting} {...user} /> :
      <UserProfileRecentActivity sorting={this.props.sorting} onChangeSorting={this.onChangeReviewsSorting} {...user}/>

    return (
    <div className='user profile show'>
      <div className='main-content'>
        <h1 className='title'>{user.name ? user.name.split(' ')[0] : 'User' }'s Profile</h1>
        <UserProfileHeader {...user}/>
        {page}
      </div>
    </div>
    );
  },
});

export default UserProfilePage;
