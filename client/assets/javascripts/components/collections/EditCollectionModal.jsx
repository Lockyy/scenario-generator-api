import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import Dropdown from '../Dropdown';
import FluxAlertActions from '../../actions/FluxAlertActions';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import ProductName from '../reviews/ProductName'
import Results from '../search/Results'

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const EditCollectionMixin = {
  renderEditCollectionModal: function() {
    return <EditCollectionModal
              close={this.closeEditCollectionModal}/>
  },

  closeEditCollectionModal: function() {
    FluxModalActions.closeModal();
    FluxCollectionActions.clearCollection();
  },

  showEditCollectionModal: function(collection) {
    FluxCollectionActions.fetchedCollection(collection);
    FluxModalActions.setVisibleModal('EditCollectionModal');
  }
};

const EditCollectionModal = React.createClass ({
  displayName: 'EditCollectionModal',

  getInitialState: function() {
    return {
      collection: {
        title: '',
        description: '',
        products: [],
        users: []
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
    this.setState({collection: data.data.collection});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },

  // Gather the IDs for the products currently added to the collection.
  // Used when creating the collection.
  getProductIDs: function() {
    return _.map(this.state.collection.products, function(product) {
      return product.id
    })
  },

  // Remove a product from the collections products.
  // We aren't modifying the CollectionStore version of the collection because
  // these changes are unsaved at this stage.
  removeProduct: function(product_id) {
    let products = this.state.collection.products.filter(function(product) {
      return product.id !== product_id;
    });

    let collection = this.state.collection
    collection.products = products

    this.setState({product_name: null, collection: collection})
  },

  // Add a product to the collections products.
  // We aren't modifying the CollectionStore version of the collection because
  // these changes are unsaved at this stage.
  addProduct: function(product, selected) {
    if(selected) {
      let updatedCollection = this.state.collection
      updatedCollection.products.push(product)
      this.setState({product_name: null, collection: updatedCollection})
    } else {
      this.setState({product_name: product.name})
    }
  },

  getCollection: function(e) {
    return {
      id: this.state.collection.id,
      title: this.state.collection.title,
      description: this.state.collection.description,
      products: this.getProductIDs(),
      privacy: this.state.collection.privacy
    }
  },

  sendNotificationOnUpdate: function(collection) {
    FluxNotificationsActions.showNotification({
      type: 'saved',
      subject: {
        id: collection.id,
        type: 'Collection',
        name: collection.title
      }
    })
  },

  submitForm: function(e) {
    e.preventDefault()
    // Don't submit if the form isn't complete
    if(!this.formCompleted()) { return }

    let _this = this
    let collection = this.getCollection(e)

    FluxCollectionActions.updateCollection(collection.id, collection, function(data) {
      _this.props.close();
      _this.sendNotificationOnUpdate(collection);
    })
  },

  onChangeField: function(name, value) {
    let hash = this.state.collection;
    hash[name] = value
    this.setState({ collection: hash })
  },

  // Runs validation on text fields.
  // Returns false if there are errors.
  validation: function() {
    let errorDom = $(this.refs.errors.getDOMNode())
    let titleDOM = $(this.refs.collection_title.getDOMNode())
    let descriptionDOM = $(this.refs.collection_description.getDOMNode())
    let errors = titleDOM.val() == '' || descriptionDOM.val() == ''
    errorDom.toggleClass('active', errors)

    return !errors
  },

  renderTextFields: function() {
    let _this = this;
    let onFocus = function(e) {
      $(React.findDOMNode(_this.refs.fields_container)).addClass('focus')
    }

    let onBlur = function(e) {
      $(React.findDOMNode(_this.refs.fields_container)).removeClass('focus')
      _this.validation()
    }

    return (
      <div>
        <div className='field-messages'>
          <div className='required'>
            * Required Fields
          </div>
          <div className='errors' ref='errors'>
            Please complete this field
          </div>
        </div>
        <div className='form-group attached-fields' ref='fields_container'>
          <input  type='text'
                  className='form-control'
                  placeholder='Title'
                  name='collection[title]'
                  ref='collection_title'
                  value={this.state.collection.title}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={(e) => this.onChangeField('title', e.currentTarget.value)} />
          <textarea type='text'
                    className='form-control'
                    placeholder='Say something'
                    name='collection[description]'
                    rows='10'
                    ref='collection_description'
                    value={this.state.collection.description}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={(e) => this.onChangeField('description', e.currentTarget.value)} />
        </div>
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
        data={{data: this.state.collection.products}} />
    )
  },

  formCompleted: function() {
    return (this.validation() && this.state.collection.products.length > 0)
  },

  deleteCollection: function() {
    let _this = this;

    FluxAlertActions.showAlert({
      title: `Are you sure you want to delete ${this.state.collection.title}`,
      success: 'Yes, delete it',
      cancel: "No, don't delete it",
      successCallback: function() {
        FluxCollectionActions.deleteCollection({
          id: _this.state.collection.id,
          name: _this.state.collection.title
        })
        FluxModalActions.closeModal();
      }
    })
  },

  renderSubmissionButtons: function() {
    return (
      <div className='buttons'>
        <button className='btn btn-red btn-round'
                onClick={this.deleteCollection}>Delete Collection</button>
        <button className='btn btn-grey btn-round'
                onClick={this.submitForm} >Save</button>
      </div>
    )
  },

  renderCollectionForm: function() {
    return (
      <div className='row'>
        <form className='col-xs-12 form collection'
              ref='collection_form'>
          {this.renderTextFields()}

          <div className='grey'>
            {this.renderProductTypeahead()}
            {this.renderProducts()}
            {this.renderSubmissionButtons()}
          </div>
        </form>
      </div>
    )
  },

  changePrivacySetting: function(newSetting) {
    this.onChangeField('privacy', newSetting)
  },

  renderheader: function() {
    return (
      <div className='header grey'>
        <div className='left'>
          <Dropdown
            onClick={this.changePrivacySetting}
            active={this.state.collection.privacy}
            showText={false}
            options={{ visible: 'Public', hidden: 'Private' }}
            containerClass={'small'} />
          <span className='user-share'>
            Shared with {this.state.collection.users.length} user(s).
          </span>
        </div>
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
  EditCollectionMixin: EditCollectionMixin,
  EditCollectionModal: EditCollectionModal
};
