import React from 'react';
import _ from 'lodash';
import ReviewBox from './ReviewBox';
import Section from '../Section'
import SectionRow from '../SectionRow'

const UserProfilePage  = React.createClass({
  displayName: 'UserProfilePage',

  contextTypes: {
    router: React.PropTypes.object,
    currentUser: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      recent_activity: []
    }
  },

  getUserProfileHeader: function getUserProfileHeader() {
    return (<div />);
  },

  render: function render() {
    let recent_activity  = _.map(this.props.recent_activity, function(activity) {
      return (<ReviewBox key={activity.id} {...activity}/>);
    });

    return (
      <div id='recent-activity'>
        <Section hasPagination={false} rows={1} cols={4} title={"Recent Activity"}>
          <SectionRow items={recent_activity} rows={1} cols={4}/>
        </Section>
      </div>
    );
  },
});

export default UserProfilePage;
