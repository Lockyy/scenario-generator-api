import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Results from './Results'
import TagResults from './TagResults'
import Tags from '../Tags'
import TagsBox from '../TagsBox'

const SearchPageDesktopVersion = React.createClass({
  mixins: [ Navigation ],
  displayName: 'SearchPageDesktopVersion',

  getDefaultProps: function() {
    return {
      data: {
        products: [],
        companies: [],
        collections: [],
        tags: [],
        related_tags: {
          companies: { total: 0, data: [] },
          products: { total: 0, data: [] },
          collections: { total: 0, data: [] }
        },
        filtered_tags: [],
        params: {
          section: 'all'
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

  // Handling data
  ////////////////

  getRelatedTags: function() {
    let companies_tags = this.props.data.related_tags.companies
    let products_tags = this.props.data.related_tags.products
    let collections_tags = this.props.data.related_tags.collections
    switch(this.props.activeSection) {
      case 'all':
        return {
          data: companies_tags.data.concat(products_tags.data).concat(collections_tags.data),
          total: companies_tags.total + products_tags.total + collections_tags.total
        }
      case 'products':
        return products_tags
      case 'companies':
        return companies_tags
      case 'collections':
        return collections_tags
      default:
        return {
          total: 0,
          data: []
        }
    }
  },

  // Rendering
  ////////////

  renderSideLink: function(total, name, displayName) {
    let section = this.props.activeSection;
    function build_link_class(name) {
      let active = section == name ? 'active' : '';
      return 'link ' + active;
    }

    return (
      <div  className={ build_link_class(name) }
            onClick={ () => this.props.onChangeTab(name) }>
        { displayName } ({total})
      </div>
    )
  },

  renderLeftBar: function() {
    let totalProducts = this.props.data.products.total || 0;
    let totalCompanies = this.props.data.companies.total || 0;
    let totalTags = this.props.data.tags.total || 0;
    let totalCollections = this.props.data.collections.total || 0;
    let totalAll = totalProducts + totalCompanies + totalTags;

    return (
      <div className='col-xs-3'>
        <div className='links'>
          { this.renderSideLink(totalAll, 'all', 'All')}
          { this.renderSideLink(totalProducts, 'products', 'Products')}
          { this.renderSideLink(totalCompanies, 'companies', 'Companies')}
          { this.renderSideLink(totalTags, 'tags', 'Tags')}
          { this.renderSideLink(totalCollections, 'collections', 'Collections')}
        </div>
        <div className='new-product'>
          { "Can't find a product?" }
          <Link to='/app/reviews/new'>
            Add and Review It
          </Link>
        </div>
      </div>
    )
  },

  renderAllResults: function() {
    let noResultsTag = <div className='no-results'>We couldn’t find any results for your search.</div>;
    if(this.props.data.total_results == 0) {
      return noResultsTag;
    }

    return (
      <div className='col-xs-6'>
        <Results
          type='products'
          data={this.props.data.products}
          bottom='button'
          className={this.props.data.products.total <= 0 ? 'hidden' : null}
          showImages={true}
          searchTerm={this.props.searchString}
          topLeft='type'
          topRight='dropdown'
          sorting={this.props.data.sorting.products}
          onChangeSort={this.props.onChangeSort} />
        <Results
          type='companies'
          data={this.props.data.companies}
          bottom='button'
          className={this.props.data.companies.total <= 0 ? 'hidden' : null}
          showImages={true}
          searchTerm={this.props.searchString}
          topLeft='type'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.props.data.sorting.companies}
          onChangeSort={this.props.onChangeSort} />
        <TagResults
          data={this.props.data.tags}
          topRight={'dropdown'}
          className={this.props.data.tags.total <= 0 ? 'hidden' : null}
          max={50}
          bottom={'button'}
          sorting={this.props.data.sorting.tags}
          searchTerm={this.props.searchString}
          section={this.props.activeSection}
          emptyResults={noResultsTag}
          onChangeSort={this.props.onChangeSort} />
        <Results
          type='collections'
          data={this.props.data.collections}
          bottom='button'
          className={this.props.data.collections.total <= 0 ? 'hidden' : null}
          showImages={true}
          searchTerm={this.props.searchString}
          topLeft='type'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.props.data.sorting.collections}
          onChangeSort={this.props.onChangeSort} />
      </div>
    )
  },

  renderProductResults: function() {
    return (
      <div className='col-xs-6'>
        <Results
          type='products'
          data={this.props.data.products}
          noResults={'No products found that match your search'}
          showImages={true}
          bottom='pagination'
          currentPage={this.props.params.page}
          topLeft='type'
          topRight='dropdown'
          sorting={this.props.data.sorting.products}
          onChangePage={this.props.onChangePage}
          onChangeSort={this.props.onChangeSort} />
      </div>
    )
  },

  renderCompanyResults: function() {
    return (
      <div className='col-xs-6'>
        <Results
          type='companies'
          data={this.props.data.companies}
          noResults={'No companies found that match your search'}
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
          sorting={this.props.data.sorting.companies}
          onChangePage={this.props.onChangePage}
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

  renderTagResults: function() {
    return (
      <div className='col-xs-6'>
        <TagResults
          data={this.props.data.tags}
          topRight={'dropdown'}
          sorting={this.props.data.sorting.tags}
          searchTerm={this.props.searchString}
          section={this.props.params.section}
          emptyResults={'No tags found that match your search'}
          onChangeSort={this.props.onChangeSort} />
      </div>
    )
  },

  renderResults: function() {
    switch(this.props.activeSection) {
      case 'all':
        return this.renderAllResults()
      case 'products':
        return this.renderProductResults()
      case 'companies':
        return this.renderCompanyResults()
      case 'collections':
        return this.renderCollectionResults()
      case 'tags':
        return this.renderTagResults()
    }
  },

  renderFilters: function() {
    let relatedTags = this.getRelatedTags();
    let hide = !relatedTags.total || relatedTags.total <= 0;
    let _this = this;

    let filteredTags = this.props.data.filtered_tags.data;
    return (
      <div id='tag-filter-container' className='col-xs-3'>
        <TagResults
          title={'FILTER BY'}
          data={relatedTags}
          hide={hide}
          showLinkAllTags={true}
          onClick={this.props.onClickFilterTag}
          selected={filteredTags}
          searchTerm={this.props.searchString} />
      </div>
    )
  },

  render: function() {
    return (
      <div className='desktop-version'>
        <div className='row'>
          <div className='col-xs-12'>
            <input
              className='search-box'
              ref='inputBox'
              value={ this.props.searchString }
              onChange={ this.props.onSearchInput } disabled/>
          </div>
        </div>
        <div className='row'>
          { this.renderLeftBar() }
          { this.renderResults() }
          { this.renderFilters() }
        </div>
      </div>
    );
  }
})

export default SearchPageDesktopVersion;
