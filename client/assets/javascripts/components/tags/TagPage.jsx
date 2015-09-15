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
    this.fetchProducts(newProps.params.tag, newProps.params.page, newProps.location.query.sorting)
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

  changeSort: function(newSortParams) {
    this.transitionTo(`/app/tags/${this.tag()}/1`, { sorting: newSortParams.sorting.products });
  },

  changePage: function(page) {
    this.transitionTo(`/app/tags/${this.tag()}/${page}`, { sorting: this.sorting() });
  },

  renderFollowButton: function() {
    if(this.state.data.followed) {
      return <div className="btn btn-orange btn-round btn-full"
                  onClick={ () => this.unfollow() }>Unfollow</div>
    } else  {
      return <div className="btn btn-orange btn-round btn-full"
                  onClick={ () => this.follow() }>Follow</div>
    }
  },

  renderLeftBar: function () {
    return (
      <div className='col-xs-3 right-bar'>
        <div className='tagged-in'>
          Tagged In
        </div>
        <div className='tag-name'>
          { this.state.data.tag }
        </div>
        { this.renderFollowButton() }
      </div>
    )
  },

  renderResults: function() {
    return (
      <div className='col-xs-6'>
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
          onSetQuery={this.changeSort} />
      </div>
    )
  },

  render: function() {
    return (
      <div className='tags-page'>
        <div className='row'>
          { this.renderLeftBar() }
          { this.renderResults() }
        </div>
      </div>
    );
  }
})

export default TagPage;
