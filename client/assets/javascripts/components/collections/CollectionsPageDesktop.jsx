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
      }
    }
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

  renderCollectionResults: function() {
    let search_string = this.props.searchString;

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
          currentPage={this.props.page}
          topLeft='type'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.props.data.sorting.collections}
          onChangePage={this.props.onChangePage}
          onSetQuery={this.props.onSetQuery} />
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
