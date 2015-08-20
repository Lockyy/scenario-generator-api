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
    let showAllTags = this.props.showLinkAllTags ? <span className='all-tags-link'> Browse all tags</span> : '';
    if(this.props.hide) {
      return <div></div>
    } else {

      function getTagNames(tags){
        return _.collect(tags, function(tag) { return tag.name })
      }

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
            tags={getTagNames(this.props.data.data)}
            onClick={this.props.onClick}
            selected={getTagNames(this.props.selected)}
           />
            {showAllTags}
        </div>
      )
    }
  }

});

TagResults.displayName = 'TagResults';

export default TagResults;
