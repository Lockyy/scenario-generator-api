import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';

const BackBar = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'BackBar',

  render: function() {
    return (
      <div className='back-bar visible-xs'>
        <Link to='/app/tags'>
          Back
        </Link>
      </div>
    )
  }
})

export default BackBar;
