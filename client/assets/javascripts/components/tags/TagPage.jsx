import _ from 'lodash';
import React from 'react';
import timeago from 'timeago';
import { Link, Navigation } from 'react-router';
import FluxTagPageActions from '../../actions/FluxTagPageActions'
import FluxCurrentUserActions from '../../actions/FluxCurrentUserActions'
import TagStore from '../../stores/TagStore'
import Results from '../search/Results'

const TagPage = React.createClass({
  displayName: 'TagPage',
  mixins: [ Navigation ],

  getInitialState: function() {

    let location = this.context.router.state.location;
    let querySorting = _.isEmpty(location.query) ? '' : location.query.sorting;

    return {
      data: {
        tag: '',
        page: this.props.params.page || 1,
        sorting: querySorting || 'alphabetical_order',
        products: {
          total: 0,
          data: []
        }
      }
    };
  },

  tag: function() {
    return this.props.params.tag
  },

  page: function() {
    return this.state.data.page
  },

  sorting: function() {
    return this.state.data.sorting;
  },

  componentDidMount: function() {
    TagStore.listen(this.onChange.bind(this));
    this.fetchProducts(this.tag(), this.page(), this.sorting())
  },

  componentWillReceiveProps: function(newProps) {
    if(!newProps.isTransitioning) {
      let sorting
      if(newProps.location.query) {
        sorting = newProps.location.query.sorting
      } else {
        sorting = this.props.sorting
      }
      this.fetchProducts(newProps.params.tag, newProps.params.page, sorting)
    }
  },

  fetchProducts: function(tag, page, sorting) {
    FluxTagPageActions.fetchProducts(tag, page, sorting);
  },

  onChange: function(data) {
    this.setState(function(oldState) {
      let newState = _.merge({}, oldState, data);
      if (!_.isUndefined(data.data.products)) {
        newState.data.products = data.data.products;
      }
      return newState;
    });
  },

  follow: function() {
    FluxTagPageActions.follow(this.tag());
    FluxCurrentUserActions.addTag({name: this.tag()});
  },

  unfollow: function() {
    FluxTagPageActions.unfollow(this.tag());
    FluxCurrentUserActions.removeTag({name: this.tag()});
  },

  onChangeSort: function(newSortParams) {
    this.transitionTo(`/app/tag/${this.tag()}/products/1`, { sorting: newSortParams.sorting.products });
  },

  changePage: function(page) {
    this.transitionTo(`/app/tag/${this.tag()}/products/${page}`, { sorting: this.sorting() });
  },

  renderFollowButton: function() {
    let followed = this.state.data.followed;
      return (<div className="btn btn-white btn-round" onClick={ () => followed ? this.unfollow() : this.follow() }>
        { followed ? 'Following' : 'Follow'}
      </div>);
  },

  renderTagInfo: function () {
    return (
      <div className='col-xs-12 tag-header'>
        <div className='tag-name'>
          { this.state.data.tag }
        </div>
        <div className='follow-button-container'>
          { this.renderFollowButton() }
        </div>
      </div>
    )
  },

  renderResults: function() {
    return (
      <div className='col-xs-12 results-container'>
        <Results
          type='products'
          data={this.state.data.products}
          showImages={true}

          bottom='pagination'
          currentPage={this.page()}
          per_page={10}

          topLeft='count'

          topRight='dropdown'
          dropdownOptions={{
            latest: 'Latest',
            high_to_low: 'Rating High to Low',
            low_to_high: 'Rating Low to High',
            alphabetical_order: 'Alphabetical order',
          }}
          sorting={this.sorting()}

          onChangePage={this.changePage}
          onChangeSort={this.onChangeSort} />
      </div>
    )
  },

  render: function() {
    return (
      <div className='tags-page'>
        <h1 className='tagged-in'>
          Tagged In
        </h1>

        <div className='row'>
          { this.renderTagInfo() }
          { this.renderResults() }
        </div>
      </div>
    );
  }
})

export default TagPage;
