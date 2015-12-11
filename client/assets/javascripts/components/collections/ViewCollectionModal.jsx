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
import { UserListMixin } from '../modals/UserListModal'
import Avatar from '../Avatar';
import Results from '../search/Results';
import Footer from '../Footer';

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

  showViewCollectionModal: function(collection, config) {
    if(!collection.products) {
      FluxCollectionActions.fetchCollection(collection.id, function() {
        FluxModalActions.setVisibleModal('ViewCollectionModal', document.body.scrollTop);
      })
    } else {
      FluxCollectionActions.fetchedCollection(collection);
      FluxModalActions.setVisibleModal('ViewCollectionModal', document.body.scrollTop, config);
    }
  }
};

const ViewCollectionModal = React.createClass ({
  displayName: 'ViewCollectionModal',
  mixins: [
    EditCollectionMixin,
    UserListMixin,
  ],

  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      collection: {
        name: '',
        description: '',
        products: [],
        user: {
          id: ''
        },
        users: []
      },
      config: {}
    }
  },

  // Flux Methods
  ///////////////

  componentDidMount: function() {
    CollectionStore.listen(this.onChangeCollection);
    ModalStore.listen(this.onChangeModal);
    ProductStore.listen(this.onChangeProduct);
  },
  onChangeProduct: function(data) {
    this.setState({product: data.data});
  },
  onChangeCollection: function(data) {
    this.setState({collection: data.data.collection});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible, config: data.config });
  },

  // Data handling
  ////////////////

  productInCollection: function(collection) {
    if (collection.products.length == 0) {
      return false;
    }
    if(this.state.product) {
      let collectionProductIDs = _.map(collection.products, function(product) {
        return product.id
      });
      let productID = this.state.product.id;
      return _.indexOf(collectionProductIDs, productID) > -1
    }
  },

  // State changing
  /////////////////

  close: function() {
    this.props.close()
  },

  onCollaboratorClick: function() {
    if(this.state.collection.users.length > 0) {
      this.showUserListModal(this.state.collection.users)
    }
  },

  // Rendering
  ////////////

  renderButtons: function() {
    let backButton = <button className='btn btn-grey btn-round' onClick={this.close}>Back</button>;
    let addButton = "";
    let mobile = this.state.config.mobile;
    let addProduct = this.state.config.addProductToCollection;
    let collection = this.state.collection

    if (!this.productInCollection(collection) && addProduct) {
      addButton = (
        <button
          className='btn btn-red btn-round'
          onClick={(e) => addProduct(e, collection)}>
          Add
        </button>
      );
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
        <div className='collection-sharees' onClick={this.onCollaboratorClick}>
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
          <span className="num-collaborators" onClick={this.onCollaboratorClick}>
            {this.state.collection.users.length} collaborator(s)
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
        onRequestClose={this.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.close}>Back</div>

        <div className='horizontal-padding'>
          <div className={'header collection' + (this.state.config.mobile ? ' mobile' : '')}>
            <span className='title'>
              {this.state.collection.name}
            </span>
            <a onClick={this.close} className='close'></a>
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
        </div>

        <div className='grey'>
          <Results
            type='collection-product'
            data={{data: this.state.collection.products}} />

          {this.renderButtons()}
        </div>
        <Footer className='visible-xs' />
      </Modal>
    )
  }
});

module.exports = {
  ViewCollectionMixin: ViewCollectionMixin,
  ViewCollectionModal: ViewCollectionModal
};
