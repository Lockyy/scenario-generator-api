import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-router';
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

  childContextTypes: {
    router: React.PropTypes.object
  },

  getChildContext: function() {
    return {router: this.props.router};
  },

  getInitialState: function() {
    return {
      data: {
        search_string: '',
        products: { data: [] },
        companies: { data: [] },
        tags: { data: [] }
      }
    }
  },

  performSearch: _.debounce(function(search_string) {
    if(search_string.length <= 0) {
      this.closeDropdown();
    } else {
      SearchHeaderStore.listen(this.onChange.bind(this));
      FluxSearchHeaderActions.getSearchResults({ search_string: search_string, page: 1, per_page: 2, filter_by: 'name' });
    }
  }, 300),

  onChange: function(data) {
    this.setState(data);
    let resultsHolder = $(React.findDOMNode(this.refs.resultsHolder));
    let navbar = $('.navbar');
    navbar.addClass('scrollable-header');
    resultsHolder.show();
    resultsHolder.on('clickoutside', function(){
      $(this).hide()
      navbar.removeClass('scrollable-header');
    });
  },

  onSearchInput: function(event) {
    let search_string = event.target.value;

    this.performSearch(search_string)
  },

  onSubmit: function(event) {
    try { event.preventDefault() } catch(err) { }

    let search_string = $(this.refs.inputBox.getDOMNode()).val();
    if(search_string) {
      this.setState(this.getInitialState());
      this.props.router.transitionTo(`/app/search/all/${search_string}/1`);
      FluxSearchPageActions.getSearchResults({search_string: search_string})
    }
  },

  onTagClick: function(e) {
    this.closeDropdown()
    this.props.router.transitionTo(`/app/tag/${e.target.dataset.slug}/products/1`);
  },

  closeDropdown: function() {
    $('.search-container .form-control').val('');
    $('.search-container .results-dropdown').hide();
    $('.navbar').removeClass('scrollable-header');
  },

  displayResults: function() {
    return this.state.data.total_results > 0
  },

  renderResults: function() {
    if(this.displayResults()) {

      return (
        <div className='results-dropdown'>
          <div ref='resultsHolder' className='results-holder'>
            <Results
              type='products'
              data={this.state.data.products}
              topLeft='type'
              topRight='link'
              topClass='table-header full-width'
              className={'header'}
              close={this.closeDropdown}
              searchTerm={this.state.data.search_string} />
            <Results
              type='companies'
              data={this.state.data.companies}
              topLeft='type'
              topRight='link'
              topClass='table-header full-width'
              className={'header'}
              close={this.closeDropdown}
              searchTerm={this.state.data.search_string} />
            <TagResults
              data={this.state.data.tags}
              className={'header'}
              topRight={'link'}
              topClass='table-header full-width'
              max={10}
              close={this.closeDropdown}
              hide={this.state.data.tags.total <= 0}
              searchTerm={this.state.data.search_string}
              onClick={this.onTagClick} />
            <Results
              type='collections'
              data={this.state.data.collections}
              topLeft='type'
              topRight='link'
              close={this.closeDropdown}
              topClass='table-header full-width'
              className={'header'}
              searchTerm={this.state.data.search_string}
              onClick={this.closeDropdown} />
          </div>
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
