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
import RenderDesktop from './../RenderDesktop';
import RenderMobile from './../RenderMobile';

const SearchPage = React.createClass({
  mixins: [ Navigation ],
  displayName: 'SearchPage',

  getInitialState: function() {
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
        displayResults: false,
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
      params: {
        filter_by: 'name',
        section: 'all',
        search_string: ''
      }
    }
  },

  // Setup
  ////////

  componentWillReceiveProps: function(newProps) {
    if( this.props.params.search_string != newProps.params.search_string ||
        this.props.params.page != newProps.params.page) {
      this.performSearch(this.getSearchParams(newProps.params));
    }
  },

  componentDidMount: function() {
    SearchPageStore.listen(this.onChange.bind(this));
    this.performSearch(this.getSearchParams(this.props.params));
  },

  onChange: function(data) {
    this.setState(data);
  },

  // Get info
  ///////////

  getSection: function() {
    let params = this.props.params || {};
    return params.section || (_.isEmpty(params) || _.isEmpty(params.section) ? 'all' : params.section);
  },

  getSearchString: function() {
    return this.state.data.search_string;
  },

  // Searching
  ////////////

  performSearch: function(data) {
    let _this = this;

    FluxSearchPageActions.getSearchResults(data, function(data) {
      _this.setState(_.merge({}, _this.state, {data: {displayResults: !_.isEmpty(data.search_string)}}))
    });
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

  getSearchParams: function(data){
    data = _.merge({}, data);

    let _data = {
      search_string: data.search_string,
      page: data.page,
      filter_by: data.filter_by,
      filtered_tags: this.state.data.filtered_tags,
      section: data.section,
      sorting: data.sorting,
      match_mode: data.match_mode
    };
    let returnValue = _.merge(_data, this.context.router.state.location.query)
    return _.merge(_data, this.context.router.state.location.query);
  },

  onSubmit: function(e) {
    e.preventDefault();

    this.changePageAndSearch(this.state.data);
  },

  // Updating state
  /////////////////

  onChangeTab: function(section) {
    this.transitionTo(`/app/search/${section}/${this.getSearchString()}/${1}`, this.context.router.state.location.query);
  },

  onChangePage: function(page) {
    this.changePageAndSearch({ page: page });
  },

  onChangeSort: function(query) {
    let _data = _.merge(this.getSearchParams(this.state.data), query);
    this.transitionTo(this.context.router.state.location.pathname, _data.sorting);
    this.performSearch(_data);
  },

  onSearchInput: function(event) {
    let newData = _.merge({}, this.state, {data: { search_string: event.target.value }});
    this.onChange(newData);
  },

  onClickFilterTag: function(e){
    let selectedTags = this.state.data.filtered_tags.data;
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

    let mergedData = _.merge({}, this.state.data, {section: this.getSection(), page: '1'})
    let data = this.getSearchParams(mergedData);
    this.performSearch(data);
  },

  // Rendering
  ////////////

  renderSideLink: function(total, name, displayName) {
    let section = this.getSection();
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

  render: function() {
    let data = _.merge({}, this.state, this.props);

    return (
      <div className='search-page'>
        <form onSubmit={this.onSubmit}>
          <RenderDesktop>
            <SearchPageDesktopVersion {...data}
              searchString={this.getSearchString()}
              query={this.context.router.state.location.query}
              onSearchInput={this.onSearchInput}
              onSubmit={this.onSubmit}
              onPerformSearch={this.performSearch}
              onChangePage={this.onChangePage}
              activeSection={this.getSection()}
              onChangeSort={this.onChangeSort}
              onChangeTab={this.onChangeTab}
              onClickFilterTag={this.onClickFilterTag}
              performSearch={this.performSearch} />
          </RenderDesktop>
          <RenderMobile>
            <SearchPageMobileVersion {...data}
              searchString={this.getSearchString()}
              query={this.context.router.state.location.query}
              onSearchInput={this.onSearchInput}
              onSubmit={this.onSubmit}
              onPerformSearch={this.performSearch}
              onChangePage={this.onChangePage}
              activeSection={this.getSection()}
              onChangeSort={this.onChangeSort}
              onChangeTab={this.onChangeTab}
              onClickFilterTag={this.onClickFilterTag}
              performSearch={this.performSearch} />
          </RenderMobile>
        </form>
      </div>
    );
  }
})

export default SearchPage;
