import React from 'react';
import _ from 'lodash';
import UserProfileHeader from './UserProfileHeader';
import UserStore from '../../stores/UserStore';
import FluxUserActions from '../../actions/FluxUserActions';
import Section from '../Section'
import SectionRow from '../SectionRow'

const UserProfilePage  = React.createClass({
  displayName: 'UserProfilePage',

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      id: '',
      ame: '',
      avatar_url: '',
      job_title: ''
    }
  },

  componentDidMount() {
    UserStore.listen(this.onChange.bind(this));
    FluxUserActions.fetchData(this.context.router.state.params.userId);
    FluxUserActions.fetchRecentActivity(this.context.router.state.params.userId);
  },

  onChange(data) {
    this.setState(function(oldData) {
      data: _.merge(oldData, data.data, function(a, b) {
        if (_.isArray(a)) { return a.concat(b) }
      })
    });
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  render: function render() {
    let user  = this.state;

    return (
    <div className='user profile show'>
      <div className='main-content'>
        <h1 className='title'>{user.name ? user.name.split(' ')[0] : 'User' }'s Profile</h1>
        <UserProfileHeader {...user}/>

        <Section hasPagination={false} rows={1} cols={4} title={"Recent Activity"}>
          <SectionRow items={[]} rows={1} cols={4}/>
        </Section>
      </div>
    </div>
    );
  },
});

export default UserProfilePage;
