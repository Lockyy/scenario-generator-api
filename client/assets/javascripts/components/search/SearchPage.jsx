import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxSearchPageActions from '../../actions/FluxSearchPageActions'
import SearchPageStore from '../../stores/SearchPageStore'
import Results from './Results'
import SearchPageDesktopVersion from './SearchPageDesktopVersion'
import SearchPageMobileVersion from './SearchPageMobileVersion'
import TagResults from './TagResults'
import Tags from '../Tags'
import TagsBox from '../TagsBox'

const SearchPage = React.createClass({
  mixins: [ Navigation ],
  displayName: 'SearchPage',

  getInitialState: function() {
    return {
      data: {
        products: [],
        companies: [],
        tags: [],
        related_tags: [],
        filtered_tags: [],
        match_mode: {
          products: 'all',
          companies: 'all',
          tags: 'all'
        },
        sorting: {
          products: 'relevance',
          companies: 'relevance',
          tags: 'alphabetical_order'
        }
      },
      params: {
        section: 'all',
        search_string: ''
      }
    }
  },

  performSearch: function(data) {
    FluxSearchPageActions.getSearchResults(data);
  },

  componentWillReceiveProps: function(newProps) {
    this.performSearch(this.getSearchParams(this.props.params));
  },

  componentDidMount: function() {
    SearchPageStore.listen(this.onChange.bind(this));
    this.performSearch(this.getSearchParams(this.props.params));
  },

  onChange: function(data) {
    this.setState(data);
  },

  componentWillReceiveProps: function(nextProps) {
    this.performSearch(this.getSearchParams(nextProps.params));
  },

  changePageAndSearch: function(params) {
    let search_string = _.isUndefined(params.search_string) ? this.props.params.search_string : params.search_string;
    let section = params.section || this.props.params.section || 'all';
    let page = params.page || 1;

    let query = this.context.router.state.location.query;
    let searchParams = this.getSearchParams({
                          search_string: search_string, page: page,
                          section: section});
    this.performSearch(searchParams);

    if (search_string && section && page) {
      this.transitionTo(`/app/search/${section}/${search_string}/${page}`, query);
    } else {
      this.transitionTo(`/app/search/${section}`, query);
    }
  },

  onSearchInput: function(event) {
    this.changePageAndSearch({ search_string: event.target.value });
  },

  changeTab: function(section) {
    this.changePageAndSearch({ section: section });
  },

  onChangePage: function(page) {
    this.changePageAndSearch({ page: page });
  },

  displaySection: function(sectionName) {
    return (this.props.params.section == sectionName || this.props.params.section == 'all')
  },

  renderSideLink: function(total, name, displayName) {
    let section = this.props.params.section;
    function build_link_class(name) {
      let active = section == name ? 'active' : '';
      return 'link ' + active;
    }

    if(total || this.name == 'all') {
      return (
        <div  className={ build_link_class(name) }
              onClick={ () => this.changeTab(name) }>
          { displayName } ({total})
        </div>
      )
    }
  },

  renderLeftBar: function() {
    let totalProducts = this.state.data.products.total || 0;
    let totalCompanies = this.state.data.companies.total || 0;
    let totalTags = this.state.data.tags.total || 0;
    let totalAll = totalProducts + totalCompanies + totalTags;

    return (
      <div className='col-xs-3'>
        <div className='links'>
          { this.renderSideLink(totalAll, 'all', 'All')}
          { this.renderSideLink(totalProducts, 'products', 'Products')}
          { this.renderSideLink(totalCompanies, 'companies', 'Companies')}
          { this.renderSideLink(totalTags, 'tags', 'Tags')}
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
    let _data = _.merge(this.getSearchParams(this.state.data), query);
    this.transitionTo(this.context.router.state.location.pathname, _data.sorting);
    this.performSearch(_data);
  },

  getSearchParams: function(data){
    let _data = {
      search_string: data.search_string,
      page: data.page,
      filter_by: data.filter_by,
      filtered_tags: data.filtered_tags,
      section: data.section,
      sorting: data.sorting,
      match_mode: data.match_mode
    };
    return _.merge(_data, { sorting: this.context.router.state.location.query || {} });
  },

  renderAllResults: function() {
    let noResultsTag = <div className='no-results'>We couldn’t find any results for your search.</div>;
    if(this.state.data.total_results == 0 && !this.displaySection('products') &&
      !this.displaySection('companies') &&
      !this.displaySection('tags')) {
      return noResultsTag;
    }

    return (
      <div className='col-xs-6'>
        <Results
          type='products'
          data={this.state.data.products}
          bottom='button'
          searchTerm={this.props.params.search_string}
          topLeft='type'
          topRight='dropdown'
          sorting={this.state.data.sorting.products}
          onSetQuery={this.setQuery} />
        <Results
          type='companies'
          data={this.state.data.companies}
          bottom='button'
          searchTerm={this.props.params.search_string}
          topLeft='type'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.state.data.sorting.companies}
          onSetQuery={this.setQuery} />
        <TagResults
          data={this.state.data.tags}
          hide={!this.displaySection('tags')}
          topRight={'dropdown'}
          sorting={this.state.data.sorting.tags}
          searchTerm={this.props.params.search_string}
          section={this.props.params.section}
          emptyResults={noResultsTag}
          onSetQuery={this.setQuery} />
      </div>
    )
  },

  renderProductResults: function() {
    return (
      <div className='col-xs-6'>
        <Results
          type='products'
          data={this.state.data.products}
          bottom='pagination'
          currentPage={this.props.params.page}
          topLeft='type'
          topRight='dropdown'
          sorting={this.state.data.sorting.products}
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
          data={this.state.data.companies}
          bottom='pagination'
          currentPage={this.props.params.page}
          topLeft='type'
          topRight='dropdown'
          dropdownOptions={{
            relevance: 'Relevance',
            latest: 'Latest',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.state.data.sorting.companies}
          onChangePage={this.onChangePage}
          onSetQuery={this.setQuery} />
      </div>
    )
  },

  renderTagResults: function() {
    return (
      <div className='col-xs-6'>
        <TagResults
          data={this.state.data.tags}
          hide={!this.displaySection('tags')}
          topRight={'dropdown'}
          sorting={this.state.data.sorting.tags}
          searchTerm={this.props.params.search_string}
          section={this.props.params.section}
          emptyResults={<div className='no-results'>We couldn’t find any results for your search.</div>}
          onSetQuery={this.setQuery} />
      </div>
    )
  },

  renderResults: function() {
    switch(this.props.params.section) {
      case 'all':
        return this.renderAllResults()
      case 'products':
        return this.renderProductResults()
      case 'companies':
        return this.renderCompanyResults()
      case 'tags':
        return this.renderTagResults()
    }
  },

  renderFilters: function() {
    let relatedTags = this.state.data.related_tags;
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

    let filteredTags = this.state.data.filtered_tags.data;
    return (
      <div id='tag-filter-container' className='col-xs-3'>
        <TagResults
          title={'FILTER BY'}
          data={relatedTags}
          hide={hide}
          showLinkAllTags={true}
          onClick={tagEvent}
          selected={filteredTags}
          searchTerm={this.props.params.search_string} />
      </div>
    )
  },

  render: function() {
    let data = _.merge({}, this.state, this.props);

    return (
      <div className='search-page'>
        <SearchPageDesktopVersion onPerformSearch={this.performSearch} {...data} />
        <SearchPageMobileVersion onPerformSearch={this.performSearch} {...data} />
      </div>
    );
  }
})

export default SearchPage;
