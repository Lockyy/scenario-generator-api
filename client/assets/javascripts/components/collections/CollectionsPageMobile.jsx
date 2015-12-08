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
    }
  },

  componentDidMount: function() {
    let $inputBox = React.findDOMNode(this.refs.inputBox);
    $inputBox.focus();
  },

  renderCollectionResults: function() {
    return (
      <div className='col-xs-12'>
        <Results
          type='collections'
          data={this.props.data.collections}
          bottom='pagination'
          currentPage={this.props.page}
          topLeft='type'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.props.data.sorting.collections}
          emptyResults={<div className='no-results'>We couldn’t find any results for your search.</div>}
          onChangePage={this.props.onChangePage}
          onChangeSort={this.props.onChangeSort} />
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
