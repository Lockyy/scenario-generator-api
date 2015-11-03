import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxAlertActions from '../../actions/FluxAlertActions';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import ProductName from '../reviews/ProductName'
import Results from '../search/Results'
import { ShareCollectionMixin } from './ShareCollectionModal'

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const CreateCollectionMixin = {
  renderCreateCollectionModal: function() {
    return <CreateCollectionModal
              close={this.closeCreateCollectionModal}/>
  },

  closeCreateCollectionModal: function() {
    $('body').removeClass('no-scroll');
    FluxModalActions.closeModal();
    FluxCollectionActions.clearCollection();
  },

  showCreateCollectionModal: function() {
    $(window).scrollTop(0);
    $('body').addClass('no-scroll');
    FluxModalActions.setVisibleModal('CreateCollectionModal')
  },

  // This is used in AddProductToCollectionModal when the user hits
  // 'Create New Collection'
  showCreateCollectionModalWithProduct: function(product) {
    FluxCollectionActions.fetchedCollection({
      title: '', description: '', products: [product]
    });
    this.showCreateCollectionModal()
  }
};

const CreateCollectionModal = React.createClass ({
  displayName: 'CreateCollectionModal',
  mixins: [ ShareCollectionMixin ],

  getInitialState: function() {
    return {
      data: {
        collection: {
          title: '',
          description: '',
          products: []
        }
      }
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChange);
    ModalStore.listen(this.onChangeModal);
  },
  onChange: function(data) {
    this.setState({data: data.data});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },

  // Gather the IDs for the products currently added to the collection.
  // Used when creating the collection.
  getProductIDs: function() {
    return _.map(this.state.data.collection.products, function(product) {
      return product.id
    })
  },

  // Remove a product from the collections products.
  // We aren't modifying the CollectionStore version of the collection because
  // these changes are unsaved at this stage.
  removeProduct: function(product_id) {
    let products = this.state.data.collection.products.filter(function(product) {
      return product.id !== product_id;
    });

    let data = this.state.data
    data.collection.products = products

    this.setState({product_name: null, data: data})
  },

  // Add a product to the collections products.
  // We aren't modifying the CollectionStore version of the collection because
  // these changes are unsaved at this stage.
  addProduct: function(product, selected) {
    if(selected) {
      let newProducts = this.state.data.collection.products
      newProducts.push(product)
      this.setState({product_name: null, collection: {products: newProducts}})
    } else {
      this.setState({product_name: product.name})
    }
  },

  getCollection: function(e) {
    return {
      id: this.state.data.collection.id,
      title: this.state.data.collection.title,
      description: this.state.data.collection.description,
      privacy: e.currentTarget.dataset.privacy,
      products: this.getProductIDs()
    }
  },

  sendNotificationOnSubmission: function(collection) {
    FluxNotificationsActions.showNotification({
      type: 'saved',
      subject: {
        id: collection.id,
        type: 'Collection',
        name: collection.title
      }
    })
  },

  transitionToShare: function(collection, _this) {
    FluxAlertActions.showAlert({
      title: 'Your Collection was successfully created!',
      message: 'You can privately share this Collection with other users on Fletcher, or make it available to everyone by making it public.',
      success: 'Share',
      cancel: 'Not now',
      successCallback: function() {
        _this.showShareCollectionModal(collection)
      }
    })
  },

  submitForm: function(e) {
    e.preventDefault()
    // Don't submit if the form isn't complete
    if(!this.formCompleted()) { return }

    let _this = this
    let collection = this.getCollection(e)

    FluxCollectionActions.createCollection(collection, function(collection) {
      _this.props.close()
      _this.sendNotificationOnSubmission(collection);
      _this.transitionToShare(collection, _this);
    })
  },

  onChangeField: function(name, e) {
    let hash = this.state.data.collection;
    hash[name] = e.currentTarget.value
    let newState = this.state.data
    newState.collection = hash
    this.setState({ data: newState })
  },

  renderTextFields: function() {
    let _this = this;
    let onFocus = function(e) {
      $(React.findDOMNode(_this.refs.fields_container)).addClass('focus')
    }

    let onBlur = function(e) {
      $(React.findDOMNode(_this.refs.fields_container)).removeClass('focus')
    }

    return (
      <div className='form-group attached-fields' ref='fields_container'>
        <input  type='text'
                className='form-control'
                placeholder='Title'
                name='collection[title]'
                ref='collection_title'
                value={this.state.data.collection.title}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={(e) => this.onChangeField('title', e)} />
        <textarea type='text'
                  className='form-control'
                  placeholder='Say something'
                  name='collection[description]'
                  rows='10'
                  ref='collection_description'
                  value={this.state.data.collection.description}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={(e) => this.onChangeField('description', e)} />
      </div>
    )
  },

  renderProductTypeahead: function() {
    return (
      <ProductName  ref='product_name'
                    value={this.state.product_name}
                    helpMessage={'Add Product'}
                    hideLabel={true}
                    onSetProduct={this.addProduct}
                    placeholder={'Search products and add them'}
                    noEmptySubmit={true} />
    )
  },

  renderProducts: function() {
    return (
      <Results
        type='collection-product'
        onRemove={this.removeProduct}
        data={{data: this.state.data.collection.products}} />
    )
  },

  formCompleted: function() {
    return (this.state.data.collection.title.length > 0 &&
             this.state.data.collection.description.length > 0 &&
             this.state.data.collection.products.length > 0)
  },

  renderSubmissionButtons: function() {
    let disabled = !this.formCompleted()
    return (
      <div className='buttons'>
        <button className='btn btn-red btn-round'
                onClick={this.submitForm}
                data-privacy='hidden'
                disabled={disabled}>Create Collection</button>
      </div>
    )
  },

  renderCollectionForm: function() {
    return (
      <div className='row'>
        <form className='col-xs-12 form collection'
              ref='collection_form'>
          {this.renderTextFields()}
          {this.renderProductTypeahead()}

          <div className='grey'>
            {this.renderProducts()}
            {this.renderSubmissionButtons()}
          </div>
        </form>
      </div>
    )
  },

  renderheader: function() {
    return (
      <div className='header'>
        <span className='title'>
          Create Collection
        </span>
        <span onClick={this.props.close} className='close'>x</span>
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
        {this.renderheader()}
        {this.renderCollectionForm()}
      </Modal>
    )
  }
});

module.exports = {
  CreateCollectionMixin: CreateCollectionMixin,
  CreateCollectionModal: CreateCollectionModal
};
