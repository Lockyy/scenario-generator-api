import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import TextHelper from '../../utils/helpers/TextHelper';
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
import { ViewCollectionMixin } from './ViewCollectionModal'

const AddToCollectionMixin = {

  renderAddToCollectionModal: function (product) {
    return (
      <AddToCollectionModal
        ref='collectionShareModal'
        product={product}
        close={this.closeAddToCollectionModal}
        onAddToCollection={this.onAddToCollection}/>
    )
  },

  closeAddToCollectionModal: function () {
    FluxModalActions.closeModal()
  },

  showAddToCollectionModal: function (searchTerm) {
    FluxCollectionActions.performSearch(searchTerm)
    FluxModalActions.setVisibleModal('AddToCollectionModal')
  }
};

const AddToCollectionModal = React.createClass ({
  displayName: 'AddToCollectionModal',
  mixins: [ViewCollectionMixin, CreateCollectionMixin],

  getInitialState: function () {
    return {
      product: {
        name: ''
      },
      collections: [],
      searchTerm: ''
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function () {
    CollectionStore.listen(this.onChangeCollections);
    ProductStore.listen(this.onChangeProduct);
    ModalStore.listen(this.onChangeModal);
    FluxCollectionActions.performSearch('')
  },
  onChangeCollections: function (data) {
    this.setState({
      searchedCollections: data.data.searchedCollections,
      searchTerm: data.data.searchTerm
    });
  },
  onChangeProduct: function (data) {
    this.setState({product: data.data});
  },
  onChangeModal: function (data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({visible: visible});
  },

  close: function () {
    FluxCollectionActions.clearCollection();
    FluxCollectionActions.performSearch('');
    this.props.close()
  },

  onFocus: function (e) {
    $(React.findDOMNode(this.refs.fields_container)).addClass('focus')
  },

  onBlur: function (e) {
    $(React.findDOMNode(this.refs.fields_container)).removeClass('focus')
  },

  performSearchHandler: function (e) {
    let newSearchTerm = $(e.target).val()
    this.performSearch(newSearchTerm)
  },

  performSearch: function (searchTerm) {
    FluxCollectionActions.performSearch(searchTerm);
  },

  previewCollection: function (collection) {
    this.showViewCollectionModal(collection, this.addToCollection)
  },

  productInCollection: function (collection) {
    if (collection.products.length == 0) {
      return false;
    }
    let collectionProductIDs = _.map(collection.products, function (product) {
      return product.id
    });
    let productID = this.state.product.id;
    return _.indexOf(collectionProductIDs, productID) > -1
  },

  addToCollection: function (e, collection) {
    if ($(e.target).hasClass('btn-tick')) {
      return
    }
    let product = this.state.product;
    // Set the button to ticked
    $(e.target).addClass('btn-tick');
    $(e.target).parent().addClass('added');

    let sendNotification = function () {
      FluxNotificationsActions.showNotification({
        type: 'saved',
        text: `${product.name} added to ${collection.name}`,
        subject: {
          id: collection.id,
          type: 'Collection',
          name: collection.name
        }
      })
    };

    if (product.id && collection.id) {
      FluxCollectionActions.addProductToCollection(product.id, collection.id, sendNotification);
      FluxCollectionActions.performSearch(this.state.searchTerm || '');
    }
  },

  renderSearchBox: function () {
    return (
      <input onChange={this.performSearchHandler}
             placeholder='Search collections, products, and tags'
             className='form-control'
             value={this.state.searchTerm}/>
    )
  },

  renderCollectionLists: function () {
    return _.map(this.state.searchedCollections, function (collectionSet, setKey) {
      return (
        <div>
          { this.renderCollectionList(collectionSet, setKey) }
          { setKey == 'owned' ? this.renderCreateCollectionLink() : '' }
        </div>
      )
    }.bind(this))
  },

  renderCollectionList: function (collectionSet, setKey) {
    if (collectionSet.total <= 0) {
      return false;
    }

    let collectionDOMs = _.map(collectionSet.data, function (collection) {
      return this.renderCollectionListItem(collection)
    }.bind(this))

    return (
      <div className='collection-set'>
        <div className='title-bar'>
          {collectionSet.title}
        </div>
        <div className='collections'>
          {collectionDOMs}
        </div>
      </div>
    )
  },

  renderCreateCollectionLink: function () {
    if (!this.state.searchTerm) {
      return false
    }

    let onClick = function () {
      this.close()
      this.showCreateCollectionModal({name: this.state.searchTerm, products: [this.state.product]})
    }.bind(this)

    return (
      <div className='collection create-collection-link' onClick={onClick}>
        <div className='collection-info'>
          <div className='title'>
            <div className='add-collection-icon'/>
            Create a new collection called:
            <div className='collection-name'>"{TextHelper.truncate(this.state.searchTerm, 30)}"</div>
          </div>
        </div>
      </div>
    )
  },

  renderAddButton: function (collection) {
    if (this.productInCollection(collection)) {
      return <div className='already-in-collection'>Product already added to Collection</div>
    } else {
      return <div className='btn btn-round btn-red-inverted btn-add btn-list-small btn-text-normal' onClick={(e) => this.addToCollection(e, collection)}>Add</div>
    }
  },

  renderCollectionListItem: function (collection) {
    let userProfileUrl = "/app/users/" + collection.user.id;
    return (
      <div className='collection'>
        <div className='collection-details'>
          <span className='collection-icon'/>
          <span className='collection-info'>
            <div className='title'>
              {collection.name}
            </div>
            <div className='collection-details'>
              Created by <a className='author'
                            href={userProfileUrl}>{collection.user.name}</a>, {collection.display_date}
            </div>
          </span>
        </div>
        <div className='right-buttons'>
          <div className='btn btn-round btn-blue-inverted btn-view btn-list-small'
               onClick={() => this.previewCollection(collection)}/>
          {this.renderAddButton(collection)}
        </div>
      </div>
    )
  },

  renderAddToCollectionForm: function () {
    return (
      <div className='row'>
        <form className='col-xs-12 form collection'
              ref='collection_form'>
          {this.renderSearchBox()}
          <div className='grey collections-sets'>
            {this.renderCollectionLists()}
          </div>
        </form>
      </div>
    )
  },

  render: function () {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.close}>{"< Close"}</div>
        <div className='header collections'>
          <span className='title'>
            Add product to an existing collection
          </span>
          <a href="#" onClick={this.close} className='close'></a>
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
