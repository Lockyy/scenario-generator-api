import React from 'react';
import _ from 'lodash';
import MediaQuery from 'react-responsive';
import MediaQueryConstants from '../utils/constants/MediaQueryConstants';

const RenderMobile = React.createClass ({

  getDefaultProps: function() {
    return {
      conditional: true
    }
  },

  render: function() {
    if(this.props.conditional) {
      return (
        <MediaQuery
          query={MediaQueryConstants.MOBILE}
          {... this.props} />
      )
    } else {
      return (
        <div/>
      )
    }
  },
})

RenderMobile.displayName = 'RenderMobile';

export default RenderMobile;
