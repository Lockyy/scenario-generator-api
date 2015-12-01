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
        related_tags: [],
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

  getSection: function() {
    let params = this.props.params || {};
    return params.section || (_.isEmpty(params) || _.isEmpty(params.section) ? 'products' : params.section);
  },

  getSearchString: function() {
    let params = this.props.params || {};
    return _.isUndefined(params.search_string) ? '' : params.search_string;
  },

  changePageAndSearch: function(params) {
    let search_string = _.isUndefined(params.search_string) ? this.getSearchString() : params.search_string;
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
    this.changePageAndSearch({ section: section });
  },

  onChangePage: function(page) {
    this.changePageAndSearch({ page: page });
  },

  displaySection: function(sectionName) {
    return (this.getSection() == sectionName || this.getSection() == 'products')
  },

  renderSideLink: function(total, name, displayName) {
    let section = this.getSection();
    function build_link_class(name) {
      let active = section == name || section == 'all' && name == 'products' ? 'active' : '';
      return 'link ' + active;
    }

    return (
      <div className={ build_link_class(name) } onClick={ () => this.changeTab(name) }>
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
          onChangePage={this.onChangePage}
          onSetQuery={this.setQuery} />
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
          onChangePage={this.onChangePage}
          showImages={true}
          onSetQuery={this.setQuery} />
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
          onChangePage={this.onChangePage}
          onSetQuery={this.setQuery} />
      </div>
    )
  },

  renderTagResults: function() {
    return (
      <div className='col-xs-12'>
        <TagResults
          data={this.props.data.tags}
          hide={!this.displaySection('tags')}
          topLeft='size'
          topRight={'dropdown'}
          sorting={this.props.data.sorting.tags}
          searchTerm={this.getSearchString()}
          section={this.props.params.section}
          emptyResults={<div className='no-results'>We couldn’t find any results for your search.</div>}
          onSetQuery={this.setQuery} />
      </div>
    )
  },

  renderResults: function() {
    switch(this.getSection()) {
      case 'companies':
        return this.renderCompanyResults()
      case 'tags':
        return this.renderTagResults()
      default:
        return this.renderProductResults()
    }
  },

  renderFilters: function() {
    let relatedTags = this.props.data.related_tags;
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
      <div id='tag-filter-container' className='col-xs-12'>
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

  onKeyPress: function(event) {
    if (event.which == 13 || event.keyCode == 13) {
      if (_.isFunction(this.props.onSubmit)) {
        this.props.onSubmit(event);
        $(event.target).trigger('blur');
      }
    }
  },

  render: function() {
    let search_string = this.props.data.search_string;

    let searchResultsContainer = (
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
    );

    let displayResults = this.props.data.displayResults;

    return (
      <div className='mobile-version'>
        <div className='row'>
          <h1 className='title col-xs-4'>Search Fletcher</h1>
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

        { !displayResults  ? '' : searchResultsContainer}
      </div>
    );
  }
})

export default SearchPageMobileVersion;
