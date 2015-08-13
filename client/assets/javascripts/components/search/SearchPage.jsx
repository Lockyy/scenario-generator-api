import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxSearchPageActions from '../../actions/FluxSearchPageActions'
import SearchStore from '../../stores/SearchStore'
import Results from './Results'
import TagResults from './TagResults'

const SearchPage = React.createClass({
  mixins: [ Navigation ],
  displayName: 'SearchPage',

  getInitialState: function() {
    return { data: { products: [], companies: [], tags: [] } }
  },

  performSearch: function(searchString, page) {
    SearchStore.listen(this.onChange.bind(this));
    FluxSearchPageActions.getSearchResults(searchString, page);
  },

  componentDidMount: function() {
    this.performSearch(this.props.params.searchString, this.props.params.page);
  },

  onChange: function(data) {
    this.setState(data);
  },

  changePageAndSearch: function(params) {
    let searchString = params.searchString || this.props.params.searchString
    let section = params.section || this.props.params.section
    let page = params.page || 1

    this.performSearch(searchString, page);
    this.transitionTo(`/app/search/${section}/${searchString}/${page}`);
  },

  onSearchInput: function(event) {
    this.changePageAndSearch({ searchString: event.target.value });
  },

  changeTab: function(section) {
    this.changePageAndSearch({ section: section });
  },

  changePage: function(page) {
    this.changePageAndSearch({ page: page });
  },


  renderRightBar: function() {
    return (
      <div className='col-xs-3'>
        <div className='links'>
          <div className='link' onClick={ () => this.changeTab('all') }>All</div>
          <div className='link' onClick={ () => this.changeTab('products') }>Products</div>
          <div className='link' onClick={ () => this.changeTab('companies') }>Companies</div>
          <div className='link' onClick={ () => this.changeTab('tags') }>Tags</div>
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

  renderResults: function() {
    if(this.state.data.products.length == 0 &&
      this.state.data.companies.length == 0 &&
      this.state.data.tags.length == 0) {
      return <div className='no-results'>No Results</div>
    }

    return (
      <div className='col-xs-6'>
        <Results
          type='products'
          activeSection={this.props.params.section}
          data={this.state.data.products}
          searchTerm={this.props.params.searchString}
          changePage={this.changePage}
          currentPage={this.props.params.page} />
        <Results
          type='companies'
          activeSection={this.props.params.section}
          data={this.state.data.companies}
          searchTerm={this.props.params.searchString}
          changePage={this.changePage}
          currentPage={this.props.params.page} />
        <TagResults
          activeSection={this.props.params.section}
          data={this.state.data.tags}
          searchTerm={this.props.params.searchString} />
      </div>
    )
  },

  renderFilters: function() {
    return ( <div className='col-xs-3'></div>)
  },

  render: function() {
    return (
      <div className='search-page'>
        <div className='row'>
          <div className='col-xs-12'>
            <input
              className='search-box'
              ref='inputBox'
              defaultValue={ this.props.params.searchString }
              onChange={ this.onSearchInput } />
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
