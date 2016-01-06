import React from 'react';
import _ from 'lodash';
import RenderMobile from '../RenderMobile';
import Modal from 'react-modal';
import ProductStore from '../../stores/ProductStore';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxProductPageActions from '../../actions/FluxProductPageActions';
import Footer from '../Footer';

const ConfirmDeleteProductFromCollectionMixin = {
  renderConfirmDeleteProductFromCollectionModal: function () {
    return (
      <ConfirmDeleteProductFromCollectionModal
        ref='ConfirmDeleteProductFromCollectionModal'
        close={this.closeConfirmDeleteProductFromCollectionModal} />
    )
  },

  closeConfirmDeleteProductFromCollectionModal: function () {
    FluxModalActions.closeModal();
  },

  showConfirmDeleteProductFromCollectionModal: function (product) {
    FluxProductPageActions.updateData(product)
    FluxModalActions.setVisibleModal('ConfirmDeleteProductFromCollectionModal')
  }
};

const ConfirmDeleteProductFromCollectionModal = React.createClass ({
  displayName: 'ConfirmDeleteProductFromCollectionModal',
  mixins: [ConfirmDeleteProductFromCollectionMixin],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      collection: {},
      product: {
        name: ''
      }
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function () {
    ProductStore.listen(this.onChangeProduct);
    CollectionStore.listen(this.onChangeCollection);
    ModalStore.listen(this.onChangeModal);
  },

  onChangeModal: function (data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({visible: visible});
  },

  onChangeProduct: function (data) {
    this.setState({product: data.data});
  },

  onChangeCollection: function (data) {
    this.setState({collection: data.data.collection});
  },

  removeProduct: function () {
    let _this = this;
    FluxCollectionActions.deleteProduct(this.state.collection.id, this.state.product.id, function(){
      _this.props.close()
    });
  },

  renderheader: function () {
    return (
      <div className='header'>
        <span className='title'>
          {`Remove "${this.state.product.name}" from this collection?`}
        </span>
        <a onClick={this.props.close} className='close'></a>
      </div>
    )
  },

  render: function () {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.props.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.props.close}>Back</div>
        {this.renderheader()}

        <div className='grey-description'>
          <span>Removing this product will also delete it for all collaborators in this collection.</span>
        </div>


        <div className='grey buttons submission-buttons'>
          <button className='btn btn-red-inverted btn-round'
                  onClick={this.removeProduct}>Remove</button>
          <button className='btn btn-grey-inverted btn-round'
                  onClick={this.props.close}>Cancel</button>
        </div>

        <RenderMobile component={Footer}/>
      </Modal>
    )
  }
});

module.exports = {
  ConfirmDeleteProductFromCollectionMixin: ConfirmDeleteProductFromCollectionMixin,
  ConfirmDeleteProductFromCollectionModal: ConfirmDeleteProductFromCollectionModal
};
