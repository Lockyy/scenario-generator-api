import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Tags from '../Tags'

const TagResults = React.createClass ({

  getInitialState: function() {
    return { data: [] }
  },

  visible: function() {
    return (this.active() || this.props.activeSection == 'all')
  },

  active: function() {
    return this.props.activeSection && this.props.activeSection == 'tags'
  },

  render: function() {
    if(this.visible()) {
      return (
        <div className='results tags'>
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
            tags={this.props.data.data} />
        </div>
      )
    } else {
      return <div></div>
    }
  }

})

TagResults.displayName = 'TagResults';

export default TagResults;
