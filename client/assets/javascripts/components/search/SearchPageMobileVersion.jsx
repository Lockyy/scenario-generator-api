import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxSearchPageActions from '../../actions/FluxSearchPageActions'
import SearchPageStore from '../../stores/SearchPageStore'
import Results from './Results'
import TagResults from './TagResults'
import Tags from '../Tags'
import TagsBox from '../TagsBox'

const SearchPageMobileVersion = React.createClass({
  mixins: [ Navigation ],
  displayName: 'SearchPageMobileVersion',

  getDefaultProps: function() {
    return {
      data: {
        products: [],
        companies: [],
        tags: [],
        collections: [],
        related_tags: {
          companies: { total: 0, data: [] },
          products: { total: 0, data: [] },
          collections: { total: 0, data: [] }
        },
        filtered_tags: [],
        params: {
          section: 'products'
        },
        match_mode: {
          products: 'all',
          companies: 'all',
          tags: 'all',
          collections: 'all'
        },
        sorting: {
          products: 'alphabetical_order',
          companies: 'alphabetical_order',
          tags: 'alphabetical_order',
          collections: 'alphabetical_order'
        }
      }
    }
  },

  // Setup
  ////////

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

  // Rendering
  ////////////

  renderSideLink: function(total, name, displayName) {
    let section = this.props.activeSection;
    function build_link_class(name) {
      let active = section == name || section == 'all' && name == 'products' ? 'active' : '';
      return 'link ' + active;
    }

    return (
      <div className={ build_link_class(name) } onClick={ () => this.onChangeTab(name) }>
        { displayName } ({total})
      </div>
    );
  },

  renderLeftBar: function() {
    let totalProducts = this.props.data.products.total || 0;
    let totalCompanies = this.props.data.companies.total || 0;
    let totalTags = this.props.data.tags.total || 0;
    let totalCollections = this.props.data.collections.total || 0;

    return (
      <div className='links col-xs-12'>
        { this.renderSideLink(totalProducts, 'products', 'Products')}
        { this.renderSideLink(totalCompanies, 'companies', 'Companies')}
        { this.renderSideLink(totalTags, 'tags', 'Tags')}
        { this.renderSideLink(totalCollections, 'collections', 'Collections')}
      </div>
    )
  },

  renderCollectionResults: function() {
    return (
      <div className='col-xs-6'>
        <Results
          type='collections'
          data={this.props.data.collections}
          bottom='pagination'
          currentPage={this.props.params.page}
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

  renderProductResults: function() {
    return (
      <div className='col-xs-12'>
        <Results
          type='products'
          data={this.props.data.products}
          bottom='pagination'
          currentPage={this.props.params.page}
          topLeft='count'
          topRight='dropdown'
          sorting={this.props.data.sorting.products}
          emptyResults={<div className='no-results'>We couldn’t find any results for your search.</div>}
          onChangePage={this.props.onChangePage}
          showImages={true}
          onChangeSort={this.props.onChangeSort} />
      </div>
    )
  },

  renderCompanyResults: function() {
    return (
      <div className='col-xs-12'>
        <Results
          type='companies'
          data={this.props.data.companies}
          bottom='pagination'
          currentPage={this.props.params.page}
          topLeft='count'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.props.data.sorting.companies}
          emptyResults={<div className='no-results'>We couldn’t find any results for your search.</div>}
          onChangePage={this.props.onChangePage}
          onChangeSort={this.props.onChangeSort} />
      </div>
    )
  },

  renderTagResults: function() {
    return (
      <div className='col-xs-12'>
        <TagResults
          data={this.props.data.tags}
          topLeft='size'
          topRight={'dropdown'}
          sorting={this.props.data.sorting.tags}
          searchTerm={this.props.searchString}
          section={this.props.params.section}
          emptyResults={<div className='no-results'>We couldn’t find any results for your search.</div>}
          onChangeSort={this.props.onChangeSort} />
      </div>
    )
  },

  renderCollectionResults: function() {
    return (
      <div className='col-xs-6'>
        <Results
          type='collections'
          data={this.props.data.collections}
          noResults={'No collections found that match your search'}
          showImages={true}
          bottom='pagination'
          currentPage={this.props.params.page}
          topLeft='type'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          bottomLink={'/app/directory/collections'}
          linkText={'Browse all public collections'}
          sorting={this.props.data.sorting.collections}
          onChangePage={this.props.onChangePage}
          onChangeSort={this.props.onChangeSort} />
      </div>
    )
  },

  renderResults: function() {
    switch(this.props.activeSection) {
      case 'companies':
        return this.renderCompanyResults()
      case 'tags':
        return this.renderTagResults()
      case 'collections':
        return this.renderCollectionResults()
      default:
        return this.renderProductResults()
    }
  },

  renderResultsSection: function() {
    if(this.props.data.displayResults) {
      return (
        <div className='search-results-container'>
          <div className='row'>
            { this.renderLeftBar() }
            { this.renderResults() }
          </div>
          <div className='new-product'>
            { "Can't find a product?" }
            <Link to='/app/reviews/new'>
              Add and Review It
            </Link>
          </div>
        </div>
      )
    }
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
    return (
      <div className='mobile-version'>
        <div className='row'>
          <h1 className='title col-xs-4'>Search Fletcher</h1>
          <div className='col-xs-12'>
            <input
              className='search-box'
              ref='inputBox'
              value={ this.props.searchString }
              placeholder='Type to search'
              onKeyPress={ this.onKeyPress }
              onChange={ this.props.onSearchInput } />
          </div>
        </div>

        { this.renderResultsSection() }
      </div>
    );
  }
})

export default SearchPageMobileVersion;
