import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import RenderMobile from '../RenderMobile';
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
import Footer from '../Footer';

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const EditCollectionMixin = {
  renderEditCollectionModal: function() {
    return <EditCollectionModal
              close={this.closeEditCollectionModal}/>
  },

  closeEditCollectionModal: function() {
    FluxModalActions.closeModal();
    if(this.props.router.state.components[0].displayName != 'CollectionPage') {
      FluxCollectionActions.clearCollection();
    }
  },

  showEditCollectionModal: function(collection) {
    if(collection) {
      FluxCollectionActions.fetchedCollection(collection);
    }
    FluxModalActions.setVisibleModal('EditCollectionModal');
  }
};

const EditCollectionModal = React.createClass ({
  displayName: 'EditCollectionModal',

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      collection: {
        name: '',
        description: '',
        products: [],
        users: []
      },
      unsaved_collection: {}
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChange);
    ModalStore.listen(this.onChangeModal);
  },
  onChange: function(data) {
    this.setState({collection: data.data.collection, unsaved_collection: jQuery.extend(true, {}, data.data.collection)});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },

  // Gather the IDs for the products currently added to the collection.
  // Used when creating the collection.
  getProductIDs: function() {
    return _.map(this.state.unsaved_collection.products, function(product) {
      return product.id
    })
  },

  // Remove a product from the collections products.
  removeProduct: function(product_id) {
    let products = this.state.unsaved_collection.products.filter(function(product) {
      return product.id !== product_id;
    });

    let collection = this.state.unsaved_collection
    collection.products = products

    this.setState({product_name: null, unsaved_collection: collection})
  },

  // Add a product to the collections products.
  addProduct: function(product, selected) {
    if(selected) {
      let updatedCollection = this.state.unsaved_collection
      updatedCollection.products.push(_.merge(product, {unsaved: true}))
      this.setState({product_name: null, unsaved_collection: updatedCollection})
    } else {
      this.setState({product_name: product.name})
    }
  },

  getCollection: function(e) {
    return {
      id: this.state.collection.id,
      name: this.state.unsaved_collection.name,
      description: this.state.unsaved_collection.description,
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
        name: collection.name
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
      _this.close();
      _this.sendNotificationOnUpdate(collection);
    })
  },

  onChangeField: function(name, value) {
    if(!this.state.collection.owned) { return }
    let hash = this.state.unsaved_collection;
    hash[name] = value
    this.setState({ unsaved_collection: hash })
  },

  // Runs validation on text fields.
  // Returns false if there are errors.
  validation: function(skipDescription) {
    let errorDom = $(this.refs.errors.getDOMNode());
    let titleDOM = $(this.refs.collection_name.getDOMNode());
    let descriptionDOM = $(this.refs.collection_description.getDOMNode());
    let titleEmpty = titleDOM.val() == '';
    let descriptionEmpty = descriptionDOM.val() == '';
    let errors;

    if (skipDescription) {
      errors = titleEmpty
    } else {
      errors = titleEmpty || descriptionEmpty
      descriptionDOM.toggleClass('greyed', descriptionEmpty);
    }

    titleDOM.toggleClass('greyed', titleEmpty);

    errorDom.toggleClass('active', errors);

    return !errors
  },

  skipDescriptionValidation: function(e) {
    return $(e.target).prop("tagName") == 'INPUT' && $(e.relatedTarget).prop("tagName") == 'TEXTAREA'
  },

  renderTextFields: function() {
    let _this = this;
    let onFocus = function(e) {
      $(React.findDOMNode(_this.refs.fields_container)).addClass('focus')
    }

    let onBlur = function(e) {
      $(React.findDOMNode(_this.refs.fields_container)).removeClass('focus')
      _this.validation(_this.skipDescriptionValidation(e))
    }

    return (
      <div>
        <div className='field-messages'>
          <div className='errors' ref='errors'>
            Please enter a title and description
          </div>
        </div>
        <div className='form-group attached-fields' ref='fields_container'>
          <input  type='text'
                  className='form-control'
                  placeholder='Title'
                  name='collection[name]'
                  ref='collection_name'
                  value={this.state.unsaved_collection.name}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={(e) => this.onChangeField('name', e.currentTarget.value)}/>
          <textarea type='text'
                    className='form-control'
                    placeholder='Say something'
                    name='collection[description]'
                    rows='10'
                    ref='collection_description'
                    value={this.state.unsaved_collection.description}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={(e) => this.onChangeField('description', e.currentTarget.value)}/>
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

  unsavedProducts: function() {
    return _.filter(this.state.unsaved_collection.products, function(product) {
      return product.unsaved
    })
  },

  renderProducts: function() {
    return (
      <Results
        type='collection-product'
        onRemove={this.removeProduct}
        data={{data: this.unsavedProducts()}} />
    )
  },

  formCompleted: function() {
    return (this.validation(false))
  },

  renderSubmissionButtons: function() {
    return (
      <div className='buttons'>
        <button
          className='btn btn-grey btn-round'
          onClick={this.submitForm}>Save</button>
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
      <div className='header collections'>
        <span className='title'>
          Edit Collection
        </span>
        <a onClick={this.close} className='close'></a>
      </div>
    )
  },

  close: function(e) {
    if(e) { e.preventDefault() }
    this.setState({unsaved_collection: this.state.collection})
    this.props.close()
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.close}>Back</div>
        {this.renderheader()}
        {this.renderCollectionForm()}
        <RenderMobile component={Footer} />
      </Modal>
    )
  }
});

module.exports = {
  EditCollectionMixin: EditCollectionMixin,
  EditCollectionModal: EditCollectionModal
};
