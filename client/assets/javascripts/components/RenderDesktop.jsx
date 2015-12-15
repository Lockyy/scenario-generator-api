import React from 'react';
import _ from 'lodash';
import MediaQuery from 'react-responsive';
import MediaQueryConstants from '../utils/constants/MediaQueryConstants';

const RenderDesktop = React.createClass ({
  render: function() {
    return (
      <MediaQuery
        query={MediaQueryConstants.DESKTOP}
        {... this.props} />
    )
  },
})

RenderDesktop.displayName = 'RenderDesktop';

export default RenderDesktop;
