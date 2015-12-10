import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import ProductStore from '../../stores/ProductStore';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import { EditCollectionMixin } from './EditCollectionModal';
import Avatar from '../Avatar';
import Results from '../search/Results';

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const ViewCollectionMixin = {
  renderViewCollectionModal: function() {
    return <ViewCollectionModal close={this.closeViewCollectionModal}/>
  },

  closeViewCollectionModal: function() {
    FluxModalActions.closeModal();
    FluxCollectionActions.clearCollection();
  },

  showViewCollectionModal: function(collection, data) {
    console.log(collection);
    console.log(data);
    if(!collection.products) {
      FluxCollectionActions.fetchCollection(collection.id, function() {
        FluxModalActions.setVisibleModal('ViewCollectionModal', document.body.scrollTop);
      })
    } else {
      FluxCollectionActions.fetchedCollection(collection);
      FluxModalActions.setVisibleModal('ViewCollectionModal', document.body.scrollTop, 
          {addProductToCollection: data.addProductToCollection, mobile: data.mobile});
    }
  }
};

const ViewCollectionModal = React.createClass ({
  displayName: 'ViewCollectionModal',
  mixins: [
    EditCollectionMixin
  ],

  contextTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      collection: {
        name: '',
        description: '',
        products: [],
        user: {
          id: ''
        }
      },
      config: {}
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChangeCollection);
    ModalStore.listen(this.onChangeModal);
    ProductStore.listen(this.onChangeProduct);
  },
  onChangeProduct: function (data) {
    this.setState({product: data.data});
  },
  onChangeCollection: function(data) {
    this.setState({collection: data.data.collection});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible, config: data.config });
  },

  productInCollection: function (collection) {
    if (collection.products.length == 0) {
      return false;
    }
    if(this.state.product) {
      let collectionProductIDs = _.map(collection.products, function (product) {
        return product.id
      });
      let productID = this.state.product.id;
      return _.indexOf(collectionProductIDs, productID) > -1
    }
  },

  renderButtons: function() {
    let backButton = <button className='btn btn-grey btn-round' onClick={this.props.close}>Back</button>;
    let addButton = "";
    let mobile = this.state.config.mobile;
    let addProduct = this.state.config.addProductToCollection;
    let collection = this.state.collection
    if (!this.productInCollection(collection) && addProduct) {
      addButton = <button className='btn btn-red-inverted btn-round' onClick={(e) => addProduct(e, collection)}>Add</button>;
    }
    else if(mobile) {
      addButton = <button className='btn btn-red-inverted mobile' onClick={(e) => addProduct(e, collection)}>Add</button>;
    }

    return (
      <div className='buttons'>
        {mobile ? null : backButton }
        {addButton}
      </div>
    )
  },

  renderSharees: function() {
    if(!this.state.config.mobile && this.state.collection.users) {
        let totalUsers = this.state.collection.users.length;
          return (
            <div className='collection-sharees'>
              <Avatar url={this.state.collection.user.avatar_url} />
              {_.map(this.state.collection.users.slice(0,6), function(sharee) {
                return <Avatar url={sharee.avatar_url} />
              })}
              { totalUsers > 7 ? <Avatar number={totalUsers - 7} />: '' }
            </div>
          );
    }
    else {
      if(this.state.collection.users) {
        return (
            <span className="num-collaborators">
              {this.state.collection.users.length} collaborators
            </span>
        );
      }
    }
  },

  render: function() {
    let userProfileUrl = "/app/users/" + this.state.collection.user.id;
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.props.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.props.close}>{"< Close"}</div>

        <div className={'header collection' + (this.state.config.mobile ? ' mobile' : '')}>
          <span className='title'>
            {this.state.collection.name}
          </span>
          <a onClick={this.props.close} className='close'></a>
        </div>

        <div className='collection-details'>
          <div className='author-and-date'>
            Created by <a className='author'
                          href={userProfileUrl}>{this.state.collection.user.name}</a>, {this.state.collection.display_date}
          </div>
          { this.renderSharees() }
          { this.state.config.mobile ? null :
            <div className='collection-description'>
              {this.state.collection.description}
            </div> }
        </div>

        <div className='grey'>
          <Results
            type='collection-product'
            data={{data: this.state.collection.products}} />

          {this.renderButtons()}
        </div>
      </Modal>
    )
  }
});

module.exports = {
  ViewCollectionMixin: ViewCollectionMixin,
  ViewCollectionModal: ViewCollectionModal
};
