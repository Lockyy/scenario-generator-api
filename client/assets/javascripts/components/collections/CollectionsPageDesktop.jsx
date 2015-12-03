import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Results from '../search/Results'

const CollectionPageDesktop = React.createClass({
  mixins: [ Navigation ],
  displayName: 'CollectionPageDesktop',

  getDefaultProps: function() {
    return {
      data: {
        products: [],
        companies: [],
        collections: [],
        tags: [],
        related_tags: [],
        filtered_tags: [],
        params: {
          section: 'all'
        },
        match_mode: {
          collections: 'all'
        },
        sorting: {
          collections: 'alphabetical_order'
        }
      },
      onPerformSearch: function(data) {}
    }
  },

  performSearch: function(data) {
    this.props.onPerformSearch(data);
  },

  getSection: function() {
    let params = this.props.params || {};
    return params.section || (_.isEmpty(params) || _.isEmpty(params.section) ? 'all' : params.section);
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

  renderLeftBar: function() {
    return (
      <div className='col-xs-3'>
        <div className='links'>
          <div className='color-red uppercase border-bottom-grey'>
            All Public collections
          </div>
        </div>
      </div>
    )
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
    return _.merge(this.context.router.state.location.query, _data);
  },

  renderCollectionResults: function() {
    let search_string = this.props.params.search_string;

    return (
      <div className='col-xs-6'>
        <div className='vertical-padding'>
          <input
            className='form-control'
            ref='inputBox'
            value={ search_string }
            placeholder='Search Collections'
            onChange={ this.props.onSearchInput } />
          </div>
        <Results
          type='collections'
          data={this.props.data.collections}
          showImages={true}
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
          onChangePage={this.onChangePage}
          onSetQuery={this.setQuery} />
      </div>
    )
  },

  render: function() {
    return (
      <div className='desktop-version'>
        <div className='row'>
          { this.renderLeftBar() }
          { this.renderCollectionResults() }
        </div>
      </div>
    );
  }
})

export default CollectionPageDesktop;
