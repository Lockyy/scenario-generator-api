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
    let params = this.props.params || {};
    return _.isEmpty(params.search_string) ? '' : params.search_string;
  },

  changePageAndSearch: function(params) {
    let search_string = params.search_string || this.getSearchString();
    let section = params.section || this.getSection();
    let page = params.page || 1;

    let query = this.context.router.state.location.query;
    this.performSearch(this.getSearchParams({ search_string: search_string, page: page, section: section}));

    if (search_string && section && page) {
      this.transitionTo(`/app/search/${section}/${search_string}/${page}`, query);
    } else {
      this.transitionTo(`/app/search/${section}`, query);
    }
  },

  changeTab: function(section) {
    this.transitionTo(`/app/search/${section}/${this.getSearchString()}/${1}`, this.context.router.state.location.query);
  },

  onChangePage: function(page) {
    this.changePageAndSearch({ page: page });
  },

  displaySection: function(sectionName) {
    return (this.getSection() == sectionName || this.getSection() == 'all')
  },

  renderSideLink: function(total, name, displayName) {
    let section = this.getSection();
    function build_link_class(name) {
      let active = section == name ? 'active' : '';
      return 'link ' + active;
    }

    return (
      <div  className={ build_link_class(name) }
            onClick={ () => this.changeTab(name) }>
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

  setQuery: function(query) {
    let _data = _.merge(this.getSearchParams(this.props.data), query);
    this.transitionTo(this.context.router.state.location.pathname, _data.sorting);
    this.performSearch(_data);
  },

  getSearchParams: function(data){
    data = _.merge({}, data);

    let _data = {
      search_string: data.search_string,
      page: data.page,
      filter_by: data.filter_by,
      filtered_tags: data.filtered_tags,
      section: data.section,
      sorting: data.sorting,
      match_mode: data.match_mode
    };
    return _.merge(_data, this.context.router.state.location.query);
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
          showImages={true}
          searchTerm={this.getSearchString()}
          topLeft='type'
          topRight='dropdown'
          sorting={this.props.data.sorting.products}
          onSetQuery={this.setQuery} />
        <Results
          type='companies'
          data={this.props.data.companies}
          bottom='button'
          showImages={true}
          searchTerm={this.getSearchString()}
          topLeft='type'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.props.data.sorting.companies}
          onSetQuery={this.setQuery} />
        <TagResults
          data={this.props.data.tags}
          hide={!this.displaySection('tags')}
          topRight={'dropdown'}
          sorting={this.props.data.sorting.tags}
          searchTerm={this.getSearchString()}
          section={this.getSection()}
          emptyResults={noResultsTag}
          onSetQuery={this.setQuery} />
        <Results
          type='collections'
          data={this.props.data.collections}
          bottom='button'
          showImages={true}
          searchTerm={this.getSearchString()}
          topLeft='type'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.props.data.sorting.collections}
          onSetQuery={this.setQuery} />
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
          onChangePage={this.onChangePage}
          onSetQuery={this.setQuery} />
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
          onChangePage={this.onChangePage}
          onSetQuery={this.setQuery} />
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
          onChangePage={this.onChangePage}
          onSetQuery={this.setQuery} />
      </div>
    )
  },

  renderTagResults: function() {
    return (
      <div className='col-xs-6'>
        <TagResults
          data={this.props.data.tags}
          hide={!this.displaySection('tags')}
          topRight={'dropdown'}
          sorting={this.props.data.sorting.tags}
          searchTerm={this.getSearchString()}
          section={this.props.params.section}
          emptyResults={'No tags found that match your search'}
          onSetQuery={this.setQuery} />
      </div>
    )
  },

  renderResults: function() {
    switch(this.getSection()) {
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

  getRelatedTags: function() {
    let companies_tags = this.props.data.related_tags.companies
    let products_tags = this.props.data.related_tags.products
    let collections_tags = this.props.data.related_tags.collections
    switch(this.getSection()) {
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

  renderFilters: function() {
    let relatedTags = this.getRelatedTags();
    let hide = !relatedTags.total || relatedTags.total <= 0;
    let self = this;

    let tagEvent = function(e){
      let selectedTags = self.props.data.filtered_tags.data;
      let selectedTag = { 'name': e.target.textContent };
      let tagAlreadySelected = _.findWhere(selectedTags, selectedTag);
      let className = 'selected';

      if(tagAlreadySelected) {
        _.remove(selectedTags, function(tag) {
          return tag == tagAlreadySelected;
        });
        $(e.target).removeClass(className );
      } else {
        selectedTags.push({name: e.target.textContent});
        $(e.target).addClass(className );
      }

      let data = self.getSearchParams(_.merge({},self.props.data,{section: self.props.params.section, page: '1'}));
      self.performSearch(data);
    };

    let filteredTags = this.props.data.filtered_tags.data;
    return (
      <div id='tag-filter-container' className='col-xs-3'>
        <TagResults
          title={'FILTER BY'}
          data={relatedTags}
          hide={hide}
          showLinkAllTags={true}
          onClick={tagEvent}
          selected={filteredTags}
          searchTerm={this.getSearchString()} />
      </div>
    )
  },

  render: function() {
    let search_string = this.props.data.search_string;

    return (
      <div className='desktop-version'>
        <div className='row'>
          <div className='col-xs-12'>
            <input
              className='search-box'
              ref='inputBox'
              value={ search_string }
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
