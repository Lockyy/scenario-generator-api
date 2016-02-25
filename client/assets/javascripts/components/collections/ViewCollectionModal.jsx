import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import RenderDesktop from '../RenderDesktop';
import RenderMobile from '../RenderMobile';
import TextHelper from '../../utils/helpers/TextHelper';
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
import DateHelper from '../../utils/helpers/DateHelper';

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

  userProfileUrl: function() {
    return `/app/users/${this.state.collection.user.id}`
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

  truncatedName: function() {
    return TextHelper.truncate(this.state.collection.name, 23)
  },

  onClickAdd: function(e) {
    this.state.config.addProductToCollection(e, this.state.collection, this.close);
  },

  // Rendering
  ////////////

  renderButtons: function() {
    let addButton = false;
    let addProduct = this.state.config.addProductToCollection;
    let collection = this.state.collection

    if (!this.productInCollection(collection) && addProduct) {
      addButton = (
        <button
          className='btn btn-red-inverted btn-round mobile'
          onClick={this.onClickAdd}>
          Add
        </button>
      );
    }

    return (
      <div>
        <RenderDesktop>
          <div className='buttons'>
            {addButton}
            <button
              className='btn btn-grey-inverted btn-round'
              onClick={this.close}>
              Back
            </button>
          </div>
        </RenderDesktop>
        <RenderMobile
          conditional={addButton}>
          <div className='buttons'>
            {addButton}
          </div>
        </RenderMobile>
      </div>
    )
  },

  renderShareesDesktop: function() {
    if(this.state.collection.users) {
      let totalUsers = this.state.collection.users.length;
      return (
        <div className='collection-sharees' onClick={this.onCollaboratorClick}>
          <Avatar user={this.state.collection.user} disableLink={true} />
          {_.map(this.state.collection.users.slice(0,5), function(sharee) {
            return <Avatar user={sharee} disableLink={true} />
          })}
          { totalUsers > 6 ? <Avatar number={totalUsers - 6} disableHover={true} disableLink={true} />: '' }
        </div>
      );
    }
  },

  renderShareesMobile: function() {
    if(this.state.collection.users) {
      return (
        <span className="num-collaborators" onClick={this.onCollaboratorClick}>
          {this.state.collection.users.length} collaborator(s)
        </span>
      );
    }
  },

  renderHeaderMobile: function() {
    return (
      <div className='horizontal-padding'>
        <div className={'header' + (this.state.config.mobile ? ' mobile' : '')}>
          <span className={'title'}>{this.state.collection.name}</span>
          <a onClick={this.close} className='close'></a>
        </div>

        <div className='collection-details'>
          <div className='author-and-date'>
            Created by (
              <a className='author'
                href={this.userProfileUrl()}>
                {this.state.collection.user.name}
              </a>
            ), {DateHelper.getStrDateInDefaultFormat(this.state.collection.created_at)}
          </div>
          { this.renderShareesMobile() }
        </div>
      </div>
    )
  },

  renderHeaderDesktop: function() {
    return (
      <div>
        <div className='header previewing'>
          <span className={'title'}>
            <span className='color-highlight-blue extra-space'>Previewing: </span>
            {this.truncatedName()}
          </span>
          <a onClick={this.close} className='close'></a>
        </div>

        <div className='collection-details'>
          <div className='author-and-date'>
            Created by (
              <a className='author'
                href={this.userProfileUrl()}>
                {this.state.collection.user.name}
              </a>
            ), {DateHelper.getStrDateInDefaultFormat(this.state.collection.created_at)}
          </div>
          { this.renderShareesDesktop() }
          <div className='collection-description'>
            {this.state.collection.description}
          </div>
        </div>
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

        <RenderDesktop>{this.renderHeaderDesktop()}</RenderDesktop>
        <RenderMobile>{this.renderHeaderMobile()}</RenderMobile>

        <div className='grey'>
          <Results
            type='collection-product'
            data={{data: this.state.collection.products}} />

          {this.renderButtons()}
        </div>
        <RenderMobile component={Footer} />
      </Modal>
    )
  }
});

module.exports = {
  ViewCollectionMixin: ViewCollectionMixin,
  ViewCollectionModal: ViewCollectionModal
};
