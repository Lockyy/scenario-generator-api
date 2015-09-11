import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Tags from '../Tags'
import Dropdown from '../Dropdown';

const TagResults = React.createClass ({

  getInitialState: function() {
    return { data: [] }
  },

  addSortParam: function(sortDescription) {
    let match_mode = _.contains(this.SORT_FIELDS_SIMPLE_SEARCH, sortDescription) ? 'any' : 'all';
    let query = { sorting: { tags: sortDescription }, match_mode: { tags: match_mode } }
    this.props.onSetQuery(query)
  },

  dropdownOptions: function() {
    return this.props.dropdownOptions || {
      relevance: 'Relevance',
      latest: 'Latest',
      alphabetical_order: 'Alphabetical order',
    }
  },

  getCountResultsMessage: function(className) {
    let total = this.props.data.total;
    return (
      <div className={className ? className : ''}>
        { total ? total : 'No'  } result{total > 1 || total == 0 ? 's' : ''} found
      </div>);
  },

  renderTopRight: function() {
    switch(this.props.topRight) {
      case 'dropdown':
        if(this.props.data.total > 0) {
          return(
            <div className='top-right'>
              <Dropdown
                onClick={this.addSortParam}
                active={this.props.sorting}
                options={this.dropdownOptions()}
                containerClass={'red'} />
              </div>
          )
        }
      case 'size':
        return this.getCountResultsMessage('top-right');
    }
  },

  renderTopLeft: function() {
    switch(this.props.topLeft) {
      case 'size':
        return this.getCountResultsMessage('top-left');
      default:
        return (
          <div className='top-left'>
            {this.props.title || 'Tags'}
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
    } else {
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
          <div className ='top'>
            { this.renderTopLeft() }
            { this.renderTopRight() }
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
