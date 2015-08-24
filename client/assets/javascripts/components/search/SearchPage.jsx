import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxSearchPageActions from '../../actions/FluxSearchPageActions'
import SearchPageStore from '../../stores/SearchPageStore'
import Results from './Results'
import TagResults from './TagResults'
import Tags from '../Tags'
import TagsBox from '../TagsBox'

const SearchPage = React.createClass({
  mixins: [ Navigation ],
  displayName: 'SearchPage',

  getInitialState: function() {
    return { data: { products: [], companies: [], tags: [], related_tags: [], filtered_tags: [] } }
  },

  performSearch: function(data) {
    FluxSearchPageActions.getSearchResults(data);
  },

  componentDidMount: function() {
    SearchPageStore.listen(this.onChange.bind(this));
    this.performSearch(this.getSearchParams(this.props.params));
  },

  onChange: function(data) {
    this.setState(data);
    // For handling when a user submits a search via the header search input rather than
    // the search page input whilst on the search page.
    $(this.refs.inputBox.getDOMNode()).val(data.data.search_string);
  },

  changePageAndSearch: function(params) {
    let search_string = _.isUndefined(params.search_string) ? this.props.params.search_string : params.search_string;
    let section = params.section || this.props.params.section || 'all';
    let page = params.page || 1;

    let query = this.context.router.state.location.query;
    this.performSearch(this.getSearchParams({ search_string: search_string, page: page, section: section}));

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

  changePage: function(page) {
    this.changePageAndSearch({ page: page });
  },

  displaySection: function(sectionName) {
    return (this.props.params.section == sectionName || this.props.params.section == 'all')
  },

  renderRightBar: function() {

    let section = this.props.params.section;
    function build_link_class(name) {
      let active = section == name ? 'active' : '';
      return 'link ' + active;
    }

    let totalProducts = this.state.data.products.total || 0;
    let totalCompanies = this.state.data.companies.total || 0;
    let totalTags = this.state.data.tags.total || 0;
    let totalAll = totalProducts + totalCompanies + totalTags;

    return (
      <div className='col-xs-3'>
        <div className='links'>
          <div className={ build_link_class('all') } onClick={ () => this.changeTab('all') }>All ({totalAll})</div>
          <div className={ build_link_class('products') } onClick={ () => this.changeTab('products') }>Products ({totalProducts})</div>
          <div className={ build_link_class('companies') } onClick={ () => this.changeTab('companies') }>Companies ({totalCompanies})</div>
          <div className={ build_link_class('tags') } onClick={ () => this.changeTab('tags') }>Tags ({totalTags})</div>
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
    this.transitionTo(this.context.router.state.location.pathname, query);
    let _data = _.merge(this.getSearchParams(this.state.data), query);
    this.performSearch(_data);
  },

  getSearchParams: function(data){
    let _data = {
      search_string: data.search_string,
      page: data.page,
      filter_by: data.filter_by,
      filtered_tags: data.filtered_tags,
      section: data.section
    };
    return _.merge(_data, this.context.router.state.location.query);
  },

  renderResults: function() {
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
          searchTerm={this.props.params.search_string}
          changePage={this.changePage}
          showButton={this.props.params.section == 'all'}
          showPagination={this.props.params.section == 'products'}
          showTopLink={false}
          showImages={true}
          hide={!this.displaySection('products')}
          currentPage={this.props.params.page}
          section={this.props.params.section}
          onSetQuery={this.setQuery}
          emptyResults={noResultsTag}
            />
        <Results
          type='companies'
          data={this.state.data.companies}
          searchTerm={this.props.params.search_string}
          changePage={this.changePage}
          showButton={ this.props.params.section == 'all' }
          showPagination={ this.props.params.section == 'companies' }
          showTopLink={false}
          showImages={true}
          hide={!this.displaySection('companies')}
          currentPage={this.props.params.page}
          section={this.props.params.section}
          emptyResults={noResultsTag}
            />
        <TagResults
          data={this.state.data.tags}
          hide={!this.displaySection('tags')}
          showSize={true}
          searchTerm={this.props.params.search_string}
          section={this.props.params.section}
          emptyResults={noResultsTag}
            />
      </div>
    )
  },

  renderFilters: function() {
    let relatedTags = this.state.data.related_tags;
    let hide = !relatedTags.total || relatedTags.total <= 0;
    let self = this;

    let tagEvent = function(e){
      let selectedTags = self.state.data.filtered_tags.data;
      let selectedTag = { 'name': e.target.textContent };
      let tagAlreadySelected = _.findWhere(selectedTags, selectedTag);
      let newStatus = tagAlreadySelected ? 'unselected': 'selected';
      if(newStatus == 'unselected') {
        _.remove(selectedTags, function(tag) {
          return tag == tagAlreadySelected;
        });
      } else {
        selectedTags.push({name: e.target.textContent});
      }

      $(e.target).addClass(newStatus);
      let data = self.getSearchParams(_.merge({},self.state.data,{section: self.props.params.section, page: '1'}));
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
    return (
      <div className='search-page'>
        <div className='row'>
          <div className='col-xs-12'>
            <input
              className='search-box'
              ref='inputBox'
              defaultValue={ this.props.params.search_string }
              onChange={ this.onSearchInput } disabled/>
          </div>
        </div>
        <div className='row'>
          { this.renderRightBar() }
          { this.renderResults() }
          { this.renderFilters() }
        </div>
      </div>
    );
  }
})

export default SearchPage;
