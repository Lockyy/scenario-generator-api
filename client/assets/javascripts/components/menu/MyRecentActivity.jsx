import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxUserActions from '../../actions/FluxUserActions'
import UserStore from '../../stores/UserStore'
import EditReviewBox from '../users/EditReviewBox'

const MyRecentActivity = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'MyRecentActivity',

  contextTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      recent_activity: []
    }
  },

  componentDidMount: function() {
    UserStore.listen(this.onChange)
    FluxUserActions.fetchRecentActivity(this.context.currentUser.id)
  },

  onChange: function(data) {
    this.setState(data.data);
  },

  _getRecentActivity: function _getRecentActivity() {
    return (
      <div className='recent_activity_container'>
        <ul className='recent_activity'>
          {_.map(this.state.recent_activity, function(activity) {
            return <li className='activity'>
              <EditReviewBox size={1} {...activity} />
             </li>
          })}
        </ul>

        <a className='link-view-all' href="/app/users/current">View all recent activity</a>
      </div>
    );
  },

  render: function() {
    let details = _.isEmpty(this.state.recent_activity) ?
      <div className='no-content'>You haven’t added a review yet.</div> :
      this._getRecentActivity();
    return (
      <div className='my-recent-activity'>
        <h2>My recent activity</h2>

        { details }

      </div>
    )
  }
})

export default MyRecentActivity;
