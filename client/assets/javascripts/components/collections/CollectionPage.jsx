import _ from 'lodash';
import React from 'react';
import timeago from 'timeago';
import { Link, Navigation } from 'react-router';
import FluxCollectionActions from '../../actions/FluxCollectionActions'
import CollectionStore from '../../stores/CollectionStore'
import Results from '../search/Results'

const CollectionPage = React.createClass({
  displayName: 'CollectionPage',
  mixins: [ Navigation ],

  getInitialState: function() {
    return {
      data: {
        title: '',
        description: '',
        user: {
          name: ''
        },
        products: []
      }
    };
  },

  id: function() {
    return this.props.params.id
  },

  componentDidMount: function() {
    CollectionStore.listen(this.onChange.bind(this));
    this.fetchCollection()
  },

  componentWillReceiveProps: function(newProps) {
    if(!newProps.isTransitioning) {
      this.fetchCollection()
    }
  },

  fetchCollection: function(id) {
    FluxCollectionActions.fetchCollection(this.id());
  },

  onChange: function(data) {
    this.setState(data);
  },

  renderCollectionInfo: function () {
    return (
      <div className='col-xs-12 tag-header'>
        <div className='title'>
          { this.state.data.title }
        </div>
        <div className='created_by'>
          Created by { this.state.data.user.name }
        </div>
        <div className='description'>
          { this.state.data.description }
        </div>
      </div>
    )
  },

  renderResults: function() {
    return (
      <div className='col-xs-12 results-container'>
        <Results
          type='products'
          data={{total: this.state.data.products.length, data: this.state.data.products}}
          showImages={true}
          topLeft='count' />
      </div>
    )
  },

  render: function() {
    return (
      <div className='tags-page'>
        <div className='row'>
          { this.renderCollectionInfo() }
          { this.renderResults() }
        </div>
      </div>
    );
  }
})

export default CollectionPage;
