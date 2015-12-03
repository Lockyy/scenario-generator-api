import React from 'react';
import _ from 'lodash';
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
    this.performSearch(this.getSearchParams(this.props.params));
  },

  onChange: function(data) {
    this.setState(data);
  },

  changePageAndSearch: function(params) {
    let search_string = _.isUndefined(params.search_string) ? this.props.params.search_string : params.search_string;
    let page = params.page || 1;

    let query = this.context.router.state.location.query;
    let searchParams = this.getSearchParams({
                          search_string: search_string, page: page});

    this.performSearch(searchParams);

    if (search_string && search_string.length > 0 && page) {
      this.transitionTo(`/app/directory/collections/${search_string}/${page}`, query);
    } else {
      this.transitionTo(`/app/directory/collections`, query);
    }
  },

  onSearchInput: function(event) {
    this.changePageAndSearch({search_string: event.target.value})
  },

  onSubmit: function(e) {
    e.preventDefault();

    this.changePageAndSearch(this.state.data);
  },

  getSearchParams: function(data){
    data = _.merge({}, this.state.params, this.props.params, data)
    let _data = {
      search_string: data.search_string,
      page: data.page,
      filter_by: data.filter_by,
      filtered_tags: data.filtered_tags,
      sorting: data.sorting,
      match_mode: data.match_mode
    };
    return _.merge(_data, { sorting: this.context.router.state.location.query || {} });
  },

  render: function() {
    let data = _.merge({}, this.state, this.props);

    return (
      <div className='search-page collections'>
        <form onSubmit={this.onSubmit}>
          <CollectionsPageDesktop {...data}
            onSearchInput={this.onSearchInput} onSubmit={this.onSubmit} onPerformSearch={this.performSearch} />
          <CollectionsPageMobile {...data}
            onSearchInput={this.onSearchInput} onSubmit={this.onSubmit} onPerformSearch={this.performSearch} />
        </form>
      </div>
    );
  }
})

export default CollectionsPage;
