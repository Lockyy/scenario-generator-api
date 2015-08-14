import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Tags from '../Tags'

const TagResults = React.createClass ({

  getInitialState: function() {
    return { data: [] }
  },

  renderSize: function() {
    if(this.props.showSize) {
      return (
        <div className='size'>
          { this.props.data.total } result(s) found
        </div>
      )
    }
  },

  render: function() {
    if(this.props.hide) {
      return <div></div>
    } else {
      return (
        <div className={`results tags ${this.props.containerClass}`}>
          <div className ='title'>
            <div className='name'>
              {this.props.title || 'Tags'}
            </div>
            { this.renderSize() }
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
