import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxSearchPageActions from '../../actions/FluxSearchPageActions'
import SearchPageStore from '../../stores/SearchPageStore'
import Results from '../search/Results'

const CollectionPageMobile = React.createClass({
  mixins: [ Navigation ],
  displayName: 'CollectionPageMobile',

  getDefaultProps: function() {
    return {
      data: {
        products: [],
        companies: [],
        tags: [],
        collections: [],
        related_tags: [],
        filtered_tags: [],
        params: {
          section: 'products'
        },
        match_mode: {
          collections: 'all'
        },
        sorting: {
          collections: 'alphabetical_order'
        }
      },
      onPerformSearch: function(data) {},
      onChange: function(data) {},
    }
  },

  componentDidMount: function() {
    let $inputBox = React.findDOMNode(this.refs.inputBox);
    $inputBox.focus();
  },

  performSearch: function(data) {
    this.props.onPerformSearch(data);
  },

  onChange: function(data) {
    this.props.onChange(data);
  },

  getSearchString: function() {
    if(this.context.router.state.location.query) {
      return this.context.router.state.location.query.search_string || ''
    }
    return ''
  },

  getPage: function() {
    if(this.context.router.state.location.query) {
      return this.context.router.state.location.query.page || 1
    }
    return 1
  },

  changePageAndSearch: function(params) {
    let search_string = params.search_string || this.getSearchString();
    let page = params.page || this.getpage();

    let query = this.getSearchParams({ search_string: search_string, page: page});
    this.performSearch(query);

    this.transitionTo(`/app/directory/collections`, query);
  },

  onChangePage: function(page) {
    this.changePageAndSearch({ page: page });
  },

  setQuery: function(query) {
    let _data = _.merge(this.getSearchParams(this.props.data), query);
    this.transitionTo(this.context.router.state.location.pathname, _data.sorting);
    this.performSearch(_data);
  },

  getSearchParams: function(data){
    data = _.merge({}, data);

    let _data = {
      search_string: data.search_string,
      page: data.page
    };
    return _.merge(this.context.router.state.location.query || {}, _data);
  },

  renderCollectionResults: function() {
    return (
      <div className='col-xs-12'>
        <Results
          type='collections'
          data={this.props.data.collections}
          bottom='pagination'
          currentPage={this.getPage()}
          topLeft='type'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.props.data.sorting.collections}
          emptyResults={<div className='no-results'>We couldn’t find any results for your search.</div>}
          onChangePage={this.onChangePage}
          onSetQuery={this.setQuery} />
      </div>
    )
  },

  onKeyPress: function(event) {
    if (event.which == 13 || event.keyCode == 13) {
      if (_.isFunction(this.props.onSubmit)) {
        this.props.onSubmit(event);
        $(event.target).trigger('blur');
      }
    }
  },

  render: function() {
    let search_string = this.props.params.search_string;

    let searchResultsContainer = (
      <div className='search-results-container'>
        <div className='row'>
          { this.renderCollectionResults() }
        </div>
      </div>
    );

    return (
      <div className='mobile-version'>
        <div className='row'>
          <h1 className='title col-xs-4'>All Public Collections</h1>
          <div className='col-xs-12'>
            <input
              className='search-box'
              ref='inputBox'
              value={ search_string }
              placeholder='Type to search'
              onKeyPress={ this.onKeyPress }
              onChange={ this.props.onSearchInput } />
          </div>
        </div>

        { searchResultsContainer }
      </div>
    );
  }
})

export default CollectionPageMobile;
