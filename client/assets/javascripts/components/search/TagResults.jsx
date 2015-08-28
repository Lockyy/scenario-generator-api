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
        <div className='top-right'>
          { this.props.data.total } result(s) found
        </div>
      )
    }
  },

  getTagNames: function(tags){
    return _.collect(tags, function(tag) { return tag.name })
  },

  getTags: function() {
    let data = this.props.data.data;
    if(data && data.length > 0){
      return <Tags
        tags={data}
        onClick={this.props.onClick}
        selected={this.getTagNames(this.props.selected)} />
    }else{
      return this.props.emptyResults
    }
  },

  render: function() {
    let showAllTags = this.props.showLinkAllTags ? <span className='all-tags-link'> Browse all tags</span> : '';
    if(this.props.hide) {
      return <div></div>
    } else {
      return (
        <div className={`results tags ${this.props.containerClass}`}>
          <div className ='title'>
            <div className='top-left'>
              {this.props.title || 'Tags'}
            </div>
            { this.renderSize() }
            <div className='clear'></div>
          </div>
          {this.props.noResultsTag}
            {this.getTags()}
            {showAllTags}
        </div>
      )
    }
  }

});

TagResults.displayName = 'TagResults';

export default TagResults;
