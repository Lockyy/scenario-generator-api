import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import CollectionBox from './CollectionBox';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import CollectionTypeahead from './CollectionTypeahead'
import Results from '../search/Results'
import { CollectionMixin } from './CollectionModal'

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

const AddToCollectionMixin = {
  mixins: [ CollectionMixin ],

  renderAddToCollectionModal: function(product) {
    return (
      <div>
        <AddToCollectionModal
          ref='collectionShareModal'
          product={product}
          visible={this.addToCollectionModalVisible()}
          close={this.closeAddToCollectionModal}
          onAddToCollection={this.onAddToCollection}
          onCreateNewCollection={this.closeAddToCollectionAndShowCreateCollection} />
        {this.renderCollectionModal(true)}
      </div>
    )
  },

  closeAddToCollectionAndShowCreateCollection: function(product) {
    this.closeAddToCollectionModal();
    this.showCollectionModalWithProduct(product);
  },

  addToCollectionModalVisible: function() {
    return this.state && this.state.addToCollectionModalVisible
  },

  closeAddToCollectionModal: function() {
    $('body').removeClass('no-scroll');
    this.setState({addToCollectionModalVisible: false})
  },

  showAddToCollectionModal: function() {
    $(window).scrollTop(0);
    $('body').addClass('no-scroll');
    this.setState({addToCollectionModalVisible: true})
  },

  onAddToCollection: function(product_id, collection_id, resolve) {
    FluxCollectionActions.addProductToCollection(product_id, collection_id, resolve)
  }
};

const AddToCollectionModal = React.createClass ({
  displayName: 'CollectionShareModal',

  getInitialState: function() {
    return {
      data: {
        collection: {
          title: '',
          description: '',
          products: [],
          user: {
            name: ""
          }
        }
      }
    }
  },

  componentDidMount: function() {
    CollectionStore.listen(this.onChange);
  },

  onChange: function(collection) {
    this.setState(collection)
  },

  close: function() {
    FluxCollectionActions.clearCollection();
    this.props.close()
  },

  onFocus: function(e) {
    $(React.findDOMNode(this.refs.fields_container)).addClass('focus')
  },

  onBlur: function(e) {
    $(React.findDOMNode(this.refs.fields_container)).removeClass('focus')
  },

  submitForm: function(e) {
    e.preventDefault()
    let _this = this
    let collection = _this.state.data.collection;

    let sendNotification = function() {
      _this.close(_this)

      FluxNotificationsActions.showNotification({
        type: 'collection',
        subject: {
          id: collection.id,
          type: 'Collection',
          name: collection.title
        }
      })
    }

    this.props.onAddToCollection( this.props.product.id,
                                  collection.id,
                                  sendNotification)
  },

  setCollection: function(collection, selected) {
    if(selected) {
      FluxCollectionActions.fetchedCollection(collection)
    } else {
      this.setState({collection_name: collection.title})
    }
  },

  renderCollectionTypeahead: function() {
    return (
      <CollectionTypeahead  ref='collection_typeahead'
                            value={this.state.collection_name}
                            helpMessage={'Add To Collection'}
                            hideLabel={true}
                            _onSelectCollection={this.setCollection} />
    )
  },

  renderSubmissionButtons: function() {
    return (
      <div className='buttons'>
        <button className='btn btn-red btn-round'
                onClick={this.submitForm}>Add To Collection</button>
      </div>
    )
  },

  renderNewCollectionLink: function() {
    return (
      <div className='new-collection-link'>
        <div onClick={() => this.props.onCreateNewCollection(this.props.product)}>
          Add product to a new collection
        </div>
      </div>
    )
  },

  renderCurrentCollection: function() {
    if(this.state.data.collection.title != "") {
      return (
        <div className='collection-details'>
          <div className="owner">
            Collection created by {this.state.data.collection.user.name}
          </div>
          <div className='header'>
            <div className="title">
              {this.state.data.collection.title}
            </div>
          </div>
          <div className='collection-description'>
            {this.state.data.collection.description}
          </div>
          <div className='collection-products'>
            Includes: {_.map(this.state.data.collection.products, function(product) {
              return `${product.name}, `;
            })}
          </div>
        </div>
      )
    }
  },

  renderAddToCollectionForm: function() {
    return (
      <div className='row'>
        <form className='col-xs-10 col-xs-offset-1 form collection'
              ref='collection_form'>
          {this.renderCollectionTypeahead()}
          {this.renderCurrentCollection()}
          {this.renderSubmissionButtons()}
          {this.renderNewCollectionLink()}
        </form>
      </div>
    )
  },

  render: function() {
    return (
      <Modal
        isOpen={this.props.visible}>
        <div className='back-button' onClick={this.close}>{"< Close"}</div>
        <div className='header'>
          <span className='title'>
            Add this product to an existing collection
          </span>
          <span onClick={this.close} className='close'>x</span>
        </div>
        {this.renderAddToCollectionForm()}
      </Modal>
    )
  }
});

module.exports = {
  AddToCollectionMixin: AddToCollectionMixin,
  AddToCollectionModal: AddToCollectionModal
};
