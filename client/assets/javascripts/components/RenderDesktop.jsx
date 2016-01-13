import React from 'react';
import _ from 'lodash';
import MediaQuery from 'react-responsive';
import MediaQueryConstants from '../utils/constants/MediaQueryConstants';

// More Info: https://github.com/codelittinc/fletcher/wiki/RenderDesktop-and-RenderMobile

const RenderDesktop = React.createClass ({

  getDefaultProps: function() {
    return {
      conditional: true
    }
  },

  render: function() {
    if(this.props.conditional) {
      return (
        <MediaQuery
          query={MediaQueryConstants.DESKTOP}
          {... this.props} />
      )
    } else {
      return (
        <div/>
      )
    }
  },
})

RenderDesktop.displayName = 'RenderDesktop';

export default RenderDesktop;
