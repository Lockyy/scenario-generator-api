import _ from 'lodash';
import React from 'react';
import { Link, Navigation } from 'react-router';
import FluxSearchPageActions from '../../actions/FluxSearchPageActions'
import SearchPageStore from '../../stores/SearchPageStore'
import CollectionsPageDesktop from './CollectionsPageDesktop'
import CollectionsPageMobile from './CollectionsPageMobile'

const CollectionsPage = React.createClass({
  mixins: [ Navigation ],
  displayName: 'CollectionsPage',

  getInitialState: function() {
    return {
      data: {
        products: [],
        companies: [],
        collections: [],
        tags: [],
        related_tags: [],
        filtered_tags: [],
        displayResults: false,
        match_mode: {
          collections: 'all'
        },
        sorting: {
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

  performSearch: function(data) {
    let _this = this;

    FluxSearchPageActions.getSearchResults(data);
  },

  componentDidMount: function() {
    SearchPageStore.listen(this.onChange.bind(this));
    this.performSearch(this.getSearchParams());
  },

  onChange: function(data) {
    this.setState(data);
  },

  getSearchString: function() {
    if(this.context.router.state.location.query) {
      return this.context.router.state.location.query.search_string || ''
    }
    return ''
  },

  getPage: function() {
    if(this.context.router.state.location.query) {
      return this.context.router.state.location.query.page || 1
    }
    return 1
  },

  getSorting: function() {
    if (this.context.router.state.location.query &&
        this.context.router.state.location.query.sorting) {
      return this.context.router.state.location.query.sorting.collections || 'relevance'
    }
    return 'relevance'
  },

  changeQuery: function(params) {
    let query = this.getSearchParams(params)
    this.performSearch(query);

    this.transitionTo(`/app/directory/collections`, query);
  },

  onChangePage: function(page) {
    this.changeQuery({ page: page });
  },

  onChangeSort: function(query) {
    this.changeQuery(query)
  },

  getSearchParams: function(params){
    params = _.merge({}, params);
    let search_string;

    // We do it like this because params.search_string || this.getSearchString will return
    // this.getSearchString if they user is trying to give an empty filter
    if(params.search_string || params.search_string == '') {
      search_string = params.search_string
    } else {
      search_string = this.getSearchString()
    }

    let _data = {
      search_string: search_string,
      page: params.page || this.getPage(),
      sorting: { collections: (params.sorting ? params.sorting.collections : null) || this.getSorting() }
    };

    return _data
  },

  onSearchInput: function(event) {
    this.changeQuery({search_string: event.target.value, page: 1})
  },

  onSubmit: function(e) {
    e.preventDefault();

    this.changeQuery(this.state.data);
  },

  render: function() {
    let data = _.merge({}, this.state, this.props);

    return (
      <div className='search-page collections'>
        <form onSubmit={this.onSubmit}>
          <CollectionsPageDesktop {...data}
            onSearchInput={this.onSearchInput} onSubmit={this.onSubmit}
            onPerformSearch={this.performSearch} page={this.getPage()}
            onChangeSort={this.onChangeSort} onChangePage={this.onChangePage}
            searchString={this.getSearchString()} />
          <CollectionsPageMobile {...data}
            onSearchInput={this.onSearchInput} onSubmit={this.onSubmit}
            onPerformSearch={this.performSearch} page={this.getPage()}
            onChangeSort={this.onChangeSort} onChangePage={this.onChangePage}
            searchString={this.getSearchString()} />
        </form>
      </div>
    );
  }
})

export default CollectionsPage;
