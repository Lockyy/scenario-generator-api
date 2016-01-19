import React from 'react';
import _ from 'lodash';
import RenderMobile from './RenderMobile';
import { Link, Navigation } from 'react-router';

const BackBar = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'BackBar',

  render: function() {
    return (
      <RenderMobile className='back-bar'>
        <Link to='/app/tags'>
           Back
        </Link>
      </RenderMobile>
    )
  }
});

export default BackBar;
