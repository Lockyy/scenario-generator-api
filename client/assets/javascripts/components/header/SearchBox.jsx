import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import timeago from 'timeago';
import FluxSearchHeaderActions from '../../actions/FluxSearchHeaderActions'
import FluxSearchPageActions from '../../actions/FluxSearchPageActions'
import SearchHeaderStore from '../../stores/SearchHeaderStore'
import Results from '../search/Results'
import TagResults from '../search/TagResults'

const SearchBox = React.createClass ({
  mixins: [ Navigation ],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      data: {
        searchString: '',
        products: { data: [] },
        companies: { data: [] },
        tags: { data: [] },
      }
    }
  },

  performSearch: function(searchString) {
    SearchHeaderStore.listen(this.onChange.bind(this));
    FluxSearchHeaderActions.getSearchResults({ searchString: searchString, page: 1, per_page: 2});
  },

  onChange: function(data) {
    this.setState(data);
  },

  onSearchInput: function(event) {
    if(this.alreadyOnSearchPage()) {
      _.debounce(this.onSubmit)();
    } else {
      this.performSearch(event.target.value);
    }
  },

  onSubmit: function(event) {
    try { event.preventDefault() } catch(err) { }

    let searchString = $(this.refs.inputBox.getDOMNode()).val()
    if(searchString) {
      this.setState(this.getInitialState());
      this.props.router.transitionTo(`/app/search/all/${searchString}/1`);
      FluxSearchPageActions.getSearchResults({searchString: searchString})
    }
  },

  alreadyOnSearchPage: function() {
    return window.location.href.indexOf("/app/search") > -1
  },

  displayResults: function() {
    return this.state.data.total_results > 0 && !this.alreadyOnSearchPage()
  },

  renderResults: function() {
    if(this.displayResults()) {
      return (
        <div className='results-holder'>
          <Results
            type='products'
            data={this.state.data.products}
            showButton={false}
            showPagination={false}
            showTopLink={true}
            hide={this.state.data.products.total <= 0}
            containerClass={'header'}
            searchTerm={this.state.data.search_string} />
          <Results
            type='companies'
            data={this.state.data.companies}
            showButton={false}
            showPagination={false}
            showTopLink={true}
            hide={this.state.data.companies.total <= 0}
            containerClass={'header'}
            searchTerm={this.state.data.search_string} />
          <TagResults
            data={this.state.data.tags}
            containerClass={'header'}
            hide={this.state.data.tags.total <= 0}
            searchTerm={this.state.data.search_string} />
        </div>
      )
    }
  },

  render: function() {
    return (
      <form className='form-search' role="search" onSubmit={ this.onSubmit }>
        <div className="form-group">
          <input
            ref='inputBox'
            className="form-control"
            placeholder="Search"
            onChange={ this.onSearchInput }  />
          { this.renderResults() }
        </div>
      </form>
    )
  }
})

SearchBox.displayName = 'SearchBox';

export default SearchBox;
