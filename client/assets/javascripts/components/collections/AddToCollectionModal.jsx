import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import RenderMobile from '../RenderMobile';
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
import Footer from '../Footer';
import CreateCollectionMixin from './CreateCollectionMixin'
import { ViewCollectionMixin } from './ViewCollectionModal'

const AddToCollectionMixin = {

  renderAddToCollectionModal: function(product) {
    return (
      <AddToCollectionModal
        ref='addToCollectionModal'
        product={product}
        close={this.closeAddToCollectionModal}
        onAddToCollection={this.onAddToCollection}/>
    )
  },

  closeAddToCollectionModal: function() {
    FluxModalActions.closeModal()
  },

  showAddToCollectionModal: function(searchTerm, config) {
    FluxCollectionActions.performSearch(searchTerm);
    FluxModalActions.setVisibleModal('AddToCollectionModal', 0, config);
  }
};

const AddToCollectionModal = React.createClass ({
  displayName: 'AddToCollectionModal',
  mixins: [ViewCollectionMixin, CreateCollectionMixin],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      product: {
        name: ''
      },
      collections: [],
      searchTerm: '',
      addedCollections: [],
      config: {}
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChangeCollections);
    ProductStore.listen(this.onChangeProduct);
    ModalStore.listen(this.onChangeModal);
    FluxCollectionActions.performSearch('')
  },
  onChangeCollections: function(data) {
    this.setState({
      searchedCollections: data.data.searchedCollections,
      searchTerm: data.data.searchTerm
    });
  },
  onChangeProduct: function(data) {
    this.setState({product: data.data});
  },

  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible, config: data.config });
  },

  close: function() {
    FluxCollectionActions.clearCollection();
    FluxCollectionActions.performSearch('');
    this.setState({addedCollections: []})
    this.props.close()
  },

  onFocus: function(e) {
    $(React.findDOMNode(this.refs.fields_container)).addClass('focus')
  },

  onBlur: function(e) {
    $(React.findDOMNode(this.refs.fields_container)).removeClass('focus')
  },

  performSearchHandler: function(e) {
    let newSearchTerm = $(e.target).val()
    this.performSearch(newSearchTerm)
  },

  performSearch: function(searchTerm) {
    FluxCollectionActions.performSearch(searchTerm);
  },

  previewCollection: function (collection) {
    this.showViewCollectionModal(collection, {
      addProductToCollection: this.addToCollection,
      mobile: this.state.config.mobile,
    })
  },

  productInCollection: function(collection) {
    if (collection.products.length == 0) {
      return false;
    }
    let collectionProductIDs = _.map(collection.products, function(product) {
      return product.id
    });
    let productID = this.state.product.id;
    return _.indexOf(collectionProductIDs, productID) > -1
  },

  addToCollection: function(e, collection) {
    let product = this.state.product;

    let sendNotification = function() {
      FluxNotificationsActions.showNotification({
        type: 'saved',
        text: `You added <b>${product.name}</b> to the Collection <b>${collection.name}</b>`,
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
      let addedCollections = this.state.addedCollections;
      addedCollections.push(collection.id);
      this.setState({addedCollections: addedCollections})
    }
  },

  renderSearchBox: function() {
    return (
      <input onChange={this.performSearchHandler}
             placeholder='Search collections, products, and tags'
             className='form-control'
             value={this.state.searchTerm}/>
    )
  },

  renderCollectionLists: function() {
    return _.map(this.state.searchedCollections, function(collectionSet, setKey) {
      return (
        <div>
          { this.renderCollectionList(collectionSet, setKey) }
          { setKey == 'owned' ? this.renderCreateCollectionLink() : '' }
        </div>
      )
    }.bind(this))
  },

  renderCollectionList: function(collectionSet, setKey) {
    if (collectionSet.total <= 0) {
      return false;
    }

    let collectionDOMs = _.map(collectionSet.data, function(collection) {
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

  renderCreateCollectionLink: function() {
    if (!this.state.searchTerm) {
      return false
    }

    let onClick = function() {
      this.close()
      this.showCreateCollectionModal({name: this.state.searchTerm, products: [this.state.product]})
    }.bind(this)

    return (
      <div className='collection create-collection-link' onClick={onClick}>
        <div className='collection-info'>
          <div className='title'>
            <div className='add-collection-icon' />
            Create a new collection called:
            <div className='collection-name'>"{TextHelper.truncate(this.state.searchTerm, 30)}"</div>
          </div>
        </div>
      </div>
    )
  },

  collectionTicked: function(collection_id) {
    return _.indexOf(this.state.addedCollections, collection_id) > -1
  },

  renderAddButton: function(collection) {
    // If just added
    if(this.collectionTicked(collection.id)) {
      return (
        <div
          className='btn btn-round btn-red-inverted btn-add btn-list-small btn-text-normal btn-tick'>
          Added
        </div>
      )
    // If already added
    } else if (this.productInCollection(collection)) {
      return (
        <div
          className='already-in-collection'>
          Already added
        </div>
      )
    // If the product can still be added
    } else {
      return (
        <div
          className='btn btn-round btn-red-inverted btn-add btn-list-small btn-text-normal'
          onClick={(e) => this.addToCollection(e, collection)}>
          Add
        </div>
      )
    }
  },

  renderCollectionListItem: function(collection) {
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
                            href={userProfileUrl}>{collection.user.name}</a><span>, {collection.display_date}</span>
            </div>
          </span>
        </div>
        <div className={`right-buttons ${this.collectionTicked(collection.id) ? 'added' : ''}`}>
          <div
            className={'btn btn-round btn-blue-inverted btn-view btn-list-small' + (this.state.config.mobile ? ' mobile' : '')}
            onClick={() => this.previewCollection(collection)}>
            { this.state.config.mobile ? "Preview" : null }
          </div>
          {this.renderAddButton(collection)}
        </div>
      </div>
    )
  },

  hasCollectionList: function() {
    return _.filter(this.state.searchedCollections, function(set) {
      return set.total > 0;
    }).length > 0;
  },

  renderAddToCollectionForm: function() {
    return (
      <div className='row'>
        <form className='col-xs-12 form collection'
              ref='collection_form'>
          <div className='grey collections-sets'>
            {this.renderCollectionLists()}
          </div>
        </form>
      </div>
    )
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.close}>Back</div>
        <div className='header collections'>
          <span className='title'>
            Add product to an existing collection
          </span>
          <a href="#" onClick={this.close} className='close'></a>
        </div>
        {this.renderSearchBox()}
        { this.hasCollectionList() ?
            this.renderAddToCollectionForm() :
            <span className="no-results">No results found.</span> }
        <RenderMobile component={Footer} />
      </Modal>
    )
  }
});

module.exports = {
  AddToCollectionMixin: AddToCollectionMixin,
  AddToCollectionModal: AddToCollectionModal
};
