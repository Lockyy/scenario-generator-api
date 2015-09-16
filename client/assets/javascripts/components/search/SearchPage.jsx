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
        filter_by: 'name',
        section: 'all',
        search_string: ''
      }
    }
  },

  performSearch: function(data) {
    FluxSearchPageActions.getSearchResults(data);
  },

  componentWillReceiveProps: function(newProps) {
    this.performSearch(this.getSearchParams(newProps.params));
  },

  componentDidMount: function() {
    SearchPageStore.listen(this.onChange.bind(this));
    this.performSearch(this.getSearchParams(this.props.params));
  },

  onChange: function(data) {
    this.setState(data);
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
    let newData = _.merge({}, this.state, {data: { search_string: event.target.value }});
    this.onChange(newData);
  },

  onSubmit: function(e) {
    e.preventDefault();

    this.changePageAndSearch(this.state.data);
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
    data = _.merge({}, this.state.params, this.props.params, data)
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

  render: function() {
    let data = _.merge({}, this.state, this.props);

    return (
      <div className='search-page'>
        <form onSubmit={this.onSubmit}>
          <SearchPageDesktopVersion {...data}
            onSearchInput={this.onSearchInput} onSubmit={this.onSubmit} onPerformSearch={this.performSearch} />
          <SearchPageMobileVersion {...data}
            onSearchInput={this.onSearchInput} onSubmit={this.onSubmit} onPerformSearch={this.performSearch} />
        </form>
      </div>
    );
  }
})

export default SearchPage;
