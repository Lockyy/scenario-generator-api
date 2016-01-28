import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Tags from '../Tags'
import Dropdown from '../Dropdown';
import DropdownConstants from '../../utils/constants/DropdownConstants';
import FluxTagsPageActions from '../../actions/FluxTagsPageActions';

const TagResults = React.createClass ({

  getInitialState: function() {
    return { data: { data: [], total: 0 }}
  },

  componentWillReceiveProps: function(props) {
    FluxTagsPageActions.fetchTags(props.searchTerm);
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getMaxDisplayedData: function() {
    let data = this.props.data.data;
    let dataMax = data ? data.length : 0;
    return Math.min(dataMax, this.props.max) || dataMax
  },

  addSortParam: function(sortDescription) {
    let match_mode = _.contains(this.SORT_FIELDS_SIMPLE_SEARCH, sortDescription) ? 'any' : 'all';
    let query = { sorting: { tags: sortDescription }, match_mode: { tags: match_mode } }
    this.props.onChangeSort(query)
  },

  dropdownOptions: function() {
    return this.props.dropdownOptions || DropdownConstants.sortOptions
  },

  getCountResultsMessage: function(className) {
    let total = this.props.data.total;
    return (
      <div className={className ? className : ''}>
        { total } result{total == 1 ? '' : 's'} found
      </div>);
  },

  toggleSection: function(e) {
    let component = $(React.findDOMNode(this));
    let hiddenLink = component.find('.toggle-section:hidden');
    let visibleLink = component.find('.toggle-section:visible');
    let tagContainer = component.find('.tags-container')

    visibleLink.stop().fadeToggle('fast', function() {
      tagContainer.stop().slideToggle('slow', function() {
        hiddenLink.stop().fadeToggle('fast');
      });
    });

    e.preventDefault();
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
                options={this.dropdownOptions()} />
              </div>
          )
        }
      case 'link':
        if(this.props.data.total > 0) {
          let closeMethod = this.props.close ? this.props.close: function(){} ;
          return (
            <Link onClick={closeMethod} className='top-right' to={`/app/search/tags/${this.props.searchTerm}/1`}>
              View all matching tags ({this.props.data.total})
            </Link>
          );
        }
      case 'hide':
        if(this.props.data.total > 0) {
          return (
            <div className='toggle-section-container' onClick={this.toggleSection}>
              <a href='#' className='toggle-section show-section' style={{display: 'none'}}>
                <i className='glyphicon glyphicon-chevron-down'></i>SHOW
              </a>
              <a href='#' className='toggle-section hide-section'>
                <i className='glyphicon glyphicon-chevron-up'></i>HIDE
              </a>
            </div>
          )
        }
        break
      case 'size':
        return this.getCountResultsMessage('top-right');
    }
  },

  renderTopLeft: function() {
    switch(this.props.topLeft) {
      case 'size':
        return this.getCountResultsMessage('top-left');
      case 'link':
        return (
          <Link className='top-left' to={this.props.link}>
            {this.props.title || 'Tags'}
          </Link>
        )
      default:
        return (
          <div className='top-left'>
            {this.props.title || 'Tags'}
          </div>
        )
    }
  },

  renderBottom: function() {
    switch(this.props.bottom) {
      case 'button':
        return this.renderButton();
    }
  },

  renderButton: function() {
    if(this.props.data.total < this.getMaxDisplayedData()) { return false }

    return (
      <div className='show-more'>
        <Link to={`/app/search/tags/${this.props.searchTerm}/1`} className='btn btn-grey-inverted btn-round'>
          Show More
        </Link>
      </div>
    )
  },

  getTagNames: function(tags){
    return _.collect(tags, function(tag) { return tag.name })
  },

  getTags: function() {
    if(this.props.data.data) {
      return this.props.data.data.slice(0, this.getMaxDisplayedData())
    }
  },

  renderTags: function() {
    let data = this.getTags()
    if(data && data.length > 0){
      return (
        <Tags
          tags={data}
          onClick={this.props.onClick}
          selected={this.getTagNames(this.props.selected)}
          highlight={this.props.searchTerm} />
      )
    } else {
      return <div>{this.props.emptyResults}</div>
    }
  },

  render: function() {
    let showAllTags = this.props.showLinkAllTags ? <a href='/app/tags' className='all-tags-link'> See all tags</a> : '';
    if(this.props.hide) {
      return <div></div>
    } else {
      return (
        <div className={`results tags ${this.props.className}`}>
          <div className={`top ${this.props.topClass}`}>
            { this.renderTopLeft() }
            { this.renderTopRight() }
          </div>
          <div className='tags-container'>
            {this.renderTags()}
            {showAllTags}
            {this.renderBottom()}
          </div>
        </div>
      )
    }
  }

});

TagResults.displayName = 'TagResults';

export default TagResults;
