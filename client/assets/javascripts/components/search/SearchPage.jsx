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

  componentDidMount: function() {
    SearchStore.listen(this.onChange.bind(this));
    FluxSearchPageActions.getSearchResults(this.getSearchString());
  },

  doSearch: function(event) {
    SearchStore.listen(this.onChange.bind(this));
    FluxSearchPageActions.getSearchResults(event.target.value);
    this.transitionTo(`/app/search/${event.target.value}`)
  },

  onChange: function(data) {
    this.setState(data);
  },

  getSearchString: function() {
    return this.props.params.searchString
  },

  renderRightBar: function() {
    return (
      <div className='col-xs-3'>
        <div className='links'>
          <Link
            to={`/app/search/${this.getSearchString()}`}>All</Link>
          <Link
            to={`/app/search/${this.getSearchString()}/products`}>Products</Link>
          <Link
            to={`/app/search/${this.getSearchString()}/companies`}>Companies</Link>
          <Link
            to={`/app/search/${this.getSearchString()}/tags`}>Tags</Link>
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
          displayPartial={true}
          data={this.state.data.products}
          searchTerm={this.getSearchString()} />
        <Results
          type='companies'
          displayPartial={true}
          data={this.state.data.companies}
          searchTerm={this.getSearchString()} />
        <TagResults
          displayPartial={true}
          data={this.state.data.tags}
          searchTerm={this.getSearchString()} />
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
              defaultValue={ this.getSearchString() }
              onChange={ this.doSearch } />
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
