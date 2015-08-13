import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Tags from '../Tags'

const TagResults = React.createClass ({

  getInitialState: function() {
    return { data: [] }
  },

  render: function() {
    if(this.props.hide) {
      return <div></div>
    } else {
      return (
        <div className={`results tags ${this.props.containerClass}`}>
          <div className ='title'>
            <div className='name'>
              Tags
            </div>
            <div className='size'>
              { this.props.data.total } result(s) found
            </div>
            <div className='clear'></div>
          </div>
          <Tags
            tags={_.collect(this.props.data.data, function(tag) { return tag.name })} />
        </div>
      )
    }
  }

})

TagResults.displayName = 'TagResults';

export default TagResults;
