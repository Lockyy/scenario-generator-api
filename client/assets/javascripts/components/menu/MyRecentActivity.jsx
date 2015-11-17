import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-router';
import FluxCurrentUserActions from '../../actions/FluxCurrentUserActions'
import CurrentUserStore from '../../stores/CurrentUserStore'
import ReviewBox from '../users/ReviewBox'

const MyRecentActivity = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'MyRecentActivity',

  contextTypes: {
    currentUser: React.PropTypes.object,
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      recent_activity: []
    }
  },

  componentDidMount: function() {
    CurrentUserStore.listen(this.onChange)
    FluxCurrentUserActions.fetchRecentActivity(this.context.currentUser.id, { per_page: 4 })
  },

  onChange: function(data) {
    this.setState(data.data);
  },

  _getRecentActivity: function _getRecentActivity() {
    let _this = this
    return (
      <div className='recent_activity_container'>
        <ul className='recent_activity'>
          {_.map(this.state.recent_activity, function(activity) {
            return <li className='activity'>
              <ReviewBox size={1} small={_this.props.small} {...activity} />
             </li>
          })}
        </ul>

        <a className='link-view-all' href="/app/users/current#reviews">View all recent activity</a>
      </div>
    );
  },

  render: function() {
    let details = _.isEmpty(this.state.recent_activity) ?
      <div className='no-content'>You haven’t added a review yet.</div> :
      this._getRecentActivity();
    return (
      <div className='my-recent-activity'>
        <h2>My recent reviews</h2>

        { details }

      </div>
    )
  }
})

export default MyRecentActivity;
