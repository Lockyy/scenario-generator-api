import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import CollectionBox from './CollectionBox';
import Modal from 'react-modal';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import ProductName from '../reviews/ProductName'
import Results from '../search/Results'

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

const CollectionMixin = {
  renderCollectionModal: function() {
    return (
      <CollectionModal
        ref='collectionModal'
        visible={this.collectionModalVisible()}
        show={this.showCollectionModal}
        close={this.closeCollectionModal}
        onSaveCollection={this.onSaveCollection} />
    )
  },

  collectionModalVisible: function() {
    return this.state && this.state.showCollectionModal
  },

  closeCollectionModal: function() {
    this.setState({showCollectionModal: false})
  },

  showCollectionModal: function() {
    this.setState({showCollectionModal: true})
  },

  showCollectionModalForEditing: function(collection) {
    this.refs.collectionModal.setCollection(collection)
  },

  onSaveCollection: function(collection, resolve) {
    if(collection.id) {
      FluxCollectionActions.updateCollection(collection.id, collection, resolve)
    } else {
      FluxCollectionActions.createCollection(collection, resolve)
    }
  }
};

const CollectionModal = React.createClass ({
  displayName: 'CollectionModal',

  getInitialState: function() {
    return {
      title: '',
      description: '',
      privacy: 'hidden',
      products: []
    }
  },

  close: function() {
    this.setState(this.getInitialState());
    this.props.close()
  },

  onFocus: function(e) {
    $(React.findDOMNode(this.refs.fields_container)).addClass('focus')
  },

  onBlur: function(e) {
    $(React.findDOMNode(this.refs.fields_container)).removeClass('focus')
  },

  getProductIDs: function() {
    return _.map(this.state.products, function(product) {
      return product.id
    })
  },

  removeProduct: function(product_id) {
    debugger
    let products = this.state.products.filter(function(product) {
        return product.id !== product_id;
    });

    this.setState({product_name: null, products: products})
  },

  addProduct: function(product, selected) {
    if(selected) {
      let newProducts = this.state.products
      newProducts.push(product)
      this.setState({product_name: null, products: newProducts})
    } else {
      this.setState({product_name: product.name})
    }
  },

  submitForm: function(e) {
    e.preventDefault()
    let _this = this

    let collection = {
      title: this.state.title,
      description: this.state.description,
      privacy: e.currentTarget.dataset.privacy,
      products: this.getProductIDs()
    }

    this.props.onSaveCollection(collection, function() {
      _this.close(_this)
    })
  },

  onChangeField: function(name, e) {
    let hash = {}
    hash[name] = e.currentTarget.value
    this.setState(hash)
  },

  renderTextFields: function() {
    return (
      <div className='form-group attached-fields' ref='fields_container'>
        <input  type='text'
                className='form-control'
                placeholder='Title'
                name='collection[title]'
                ref='collection_title'
                value={this.state.title}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={(e) => this.onChangeField('title', e)} />
        <textarea type='text'
                  className='form-control'
                  placeholder='Say something'
                  name='collection[description]'
                  rows='10'
                  ref='collection_description'
                  value={this.state.description}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
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
                    onSetProduct={this.addProduct} />
    )
  },

  renderProducts: function() {
    return (
      <Results
        type='collection-product'
        onRemove={this.removeProduct}
        data={{data: this.state.products}} />
    )
  },

  buttonsDisabled: function() {
    return !(this.state.title.length > 0 &&
             this.state.description.length > 0 &&
             this.state.products.length > 0)
  },

  renderSubmissionButtons: function() {
    let disabled = this.buttonsDisabled()
    return (
      <div className='buttons'>
        <button className='btn btn-red btn-round'
                onClick={this.submitForm}
                data-privacy='hidden'
                disabled={disabled}>Create as Private</button>
        <button className='btn btn-red btn-round'
                onClick={this.submitForm}
                data-privacy='visible'
                disabled={disabled}>Create as Public</button>
      </div>
    )
  },

  renderCollectionForm: function() {
    return (
      <div className='row'>
        <form className='col-xs-10 col-xs-offset-1 form collection'
              ref='collection_form'>
          {this.renderTextFields()}
          {this.renderProductTypeahead()}
          {this.renderProducts()}
          {this.renderSubmissionButtons()}
        </form>
      </div>
    )
  },

  render: function() {
    return (
      <Modal
        isOpen={this.props.visible}>
        <div className='header'>
          <span className='title'>
            { this.props.collection && this.props.collection.id ? 'Update Collection' : 'Create Collection'}
          </span>
          <span onClick={this.props.close} className='close'>x</span>
        </div>
        {this.renderCollectionForm()}
      </Modal>
    )
  }
});

module.exports = {
  CollectionMixin: CollectionMixin,
  CollectionModal: CollectionModal
};
