import React from 'react';
import _ from 'lodash';
import MediaQuery from 'react-responsive';
import MediaQueryConstants from '../utils/constants/MediaQueryConstants';

const RenderMobile = React.createClass ({
  render: function() {
    return (
      <MediaQuery
        query={MediaQueryConstants.MOBILE}
        {... this.props} />
    )
  },
})

RenderMobile.displayName = 'RenderMobile';

export default RenderMobile;
