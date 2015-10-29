import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import ProductStore from '../../stores/ProductStore';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import CollectionTypeahead from './CollectionTypeahead'
import Results from '../search/Results'
import { CreateCollectionMixin } from './CreateCollectionModal'

const AddToCollectionMixin = {

  renderAddToCollectionModal: function(product) {
    return (
      <AddToCollectionModal
        ref='collectionShareModal'
        product={product}
        close={this.closeAddToCollectionModal}
        onAddToCollection={this.onAddToCollection} />
    )
  },

  closeAddToCollectionModal: function() {
    $('body').removeClass('no-scroll');
    FluxModalActions.closeModal()
  },

  showAddToCollectionModal: function() {
    $(window).scrollTop(0);
    $('body').addClass('no-scroll');
    FluxModalActions.setVisibleModal('AddToCollectionModal')
  }
};

const AddToCollectionModal = React.createClass ({
  displayName: 'AddToCollectionModal',
  mixins: [ CreateCollectionMixin ],

  getInitialState: function() {
    return {
      collection: {
        title: '',
        description: '',
        products: [],
        user: {
          name: ""
        }
      },
      product: {
        name: ''
      }
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChangeCollection);
    ProductStore.listen(this.onChangeProduct);
    ModalStore.listen(this.onChangeModal);
  },
  onChangeCollection: function(data) {
    this.setState({collection: data.data.collection});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },
  onChangeProduct: function(data) {
    this.setState({ product: data.data });
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
    let collection = _this.state.collection;
    let product_id = this.state.product.id;

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

    if(product_id && collection.id) {
      FluxCollectionActions.addProductToCollection(product_id, collection.id, sendNotification)
    }
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

  addToNewCollection: function(product) {
    this.props.close();
    this.showCreateCollectionModalWithProduct(product);
  },

  renderNewCollectionLink: function() {
    return (
      <div className='new-collection-link'>
        <div onClick={() => this.addToNewCollection(this.state.product)}>
          Add product to a new collection
        </div>
      </div>
    )
  },

  renderCurrentCollection: function() {
    if(this.state.collection.title != "") {
      return (
        <div className='collection-details'>
          <div className="owner">
            Collection created by {this.state.collection.user.name}
          </div>
          <div className='header'>
            <div className="title">
              {this.state.collection.title}
            </div>
          </div>
          <div className='collection-description'>
            {this.state.collection.description}
          </div>
          <div className='collection-products'>
            Includes: {_.map(this.state.collection.products, function(product) {
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
        <form className='col-xs-12 form collection'
              ref='collection_form'>
          {this.renderCollectionTypeahead()}
          <div className='grey'>
            {this.renderCurrentCollection()}
            {this.renderSubmissionButtons()}
            {this.renderNewCollectionLink()}
          </div>
        </form>
      </div>
    )
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.props.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.props.close}>{"< Close"}</div>
        <div className='header'>
          <span className='title'>
            Add this product to an existing collection
          </span>
          <span onClick={this.props.close} className='close'>x</span>
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
