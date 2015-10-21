import _ from 'lodash';
import React from 'react';
import timeago from 'timeago';
import { Link, Navigation } from 'react-router';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxAlertActions from '../../actions/FluxAlertActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions';
import CollectionStore from '../../stores/CollectionStore'
import Results from '../search/Results'
import { CollectionMixin } from './CollectionModal';

const CollectionPage = React.createClass({
  displayName: 'CollectionPage',
  mixins: [ Navigation, CollectionMixin ],

  contextTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      data: {
        collection: {
          title: '',
          description: '',
          user: {
            name: ''
          },
          products: []
        }
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

  ownedByUser: function() {
    return this.context.currentUser.id == this.state.data.collection.user.id
  },

  deleteCollection: function() {
    let _this = this;
    let collection_name = this.state.data.collection.title;

    FluxAlertActions.showAlert({
      title: `Are you sure you want to delete ${collection_name}`,
      success: 'Yes, delete it',
      cancel: "No, don't delete it",
      successCallback: function() {
        FluxCollectionActions.deleteCollection({
          id: _this.props.params.id,
          name: collection_name
        })
        _this.context.router.transitionTo('/app')
      }
    })
  },

  renderEditButtons: function () {
    if(this.ownedByUser()) {
      return (
        <div className='user-buttons'>
          <div  className='btn btn-red-inverted btn-round'
                onClick={() => this.showCollectionModalForEditing(this.state.data.collection)}>
            Edit
          </div>
          <div  className='btn btn-red-inverted btn-round'
                onClick={() => this.showCollectionShareModalForEditing(this.state.data.collection)}>
            Share
          </div>
          <div  className='btn btn-red-inverted btn-round'
                onClick={this.deleteCollection}>
            Delete
          </div>
        </div>
      )
    }
  },

  renderCollectionInfo: function () {
    return (
      <div className='col-xs-12 tag-header'>
        <div className='title'>
          { this.state.data.collection.title }
        </div>
        <div className='created_by'>
          Created by <Link to={`/app/users/${this.state.data.collection.user.id}`}>
            { this.state.data.collection.user.name }
          </Link>
        </div>
        <div className='description'>
          { this.state.data.collection.description }
        </div>
        {this.renderEditButtons()}
      </div>
    )
  },

  renderResults: function() {
    return (
      <div className='col-xs-12 results-container'>
        <Results
          type='products'
          data={{total: this.state.data.collection.products.length, data: this.state.data.collection.products}}
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

        {this.renderCollectionModal()}
        {this.renderCollectionShareModal()}
      </div>
    );
  }
})

export default CollectionPage;
