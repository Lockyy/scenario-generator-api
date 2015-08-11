import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Tags from '../Tags'

const TagResults = React.createClass ({

  getInitialState: function() {
    return { data: [] }
  },

  render: function() {
    if(this.props.data.length > 0) {
      return (
        <div className='results tags'>
          <div className ='title'>
            <div className='name'>
              Tags
            </div>
            <div className='size'>
              { this.props.data.length } result(s) found
            </div>
            <div className='clear'></div>
          </div>
          <Tags
            tags={this.props.data} />
        </div>
      )
    } else {
      return <div></div>
    }
  }

})

TagResults.displayName = 'TagResults';

export default TagResults;
