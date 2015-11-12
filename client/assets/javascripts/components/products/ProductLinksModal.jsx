import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import ProductStore from '../../stores/ProductStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxModalActions from '../../actions/FluxModalActions';
import UrlHelper from '../../utils/helpers/UrlHelper';
import timeago from 'timeago';

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const ProductLinksMixin = {
  renderProductLinksModal: function() {
    return <ProductLinksModal
              close={this.closeProductLinksModal}/>
  },

  closeProductLinksModal: function() {
    FluxModalActions.closeModal();
  },

  showProductLinksModal: function() {
    FluxModalActions.setVisibleModal('ProductLinksModal')
  },
};

const ProductLinksModal = React.createClass ({
  displayName: 'ProductLinksModal',
  mixins: [ ProductLinksMixin ],

  getInitialState: function() {
    return {
      data: {
        product: {
          name: ''
        }
      }
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    ProductStore.listen(this.onChangeProduct);
    ModalStore.listen(this.onChangeModal);
  },
  onChangeProduct: function(data) {
    this.setState({data: data.data});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },

  getProductData: function(name) {
    if(this.state.data) {
      return this.state.data[name]
    }
  },

  getLinks: function() {
    return _.collect(this.getProductData('links'), function(link) {
      return (<li className='link-item'>
        <div className='link-details'>
          <a className="link" href={UrlHelper.addProtocol(link.url)} target='_blank'>{link.url}</a>
          <span className='author'>{link.author ? `Uploaded by ${link.author.name}` : ''}</span>
          <span className='created_at'>{timeago(link.created_at)}</span>
        </div>
      </li>);
    });
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.props.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.props.close}>{"< Close"}</div>
        <div className='header'>
          <span className='title'>
            Links Added
          </span>
          <span onClick={this.props.close} className='close'>x</span>
        </div>
        {_.isEmpty(this.getProductData('links')) ? (<span className='message'>No links have been added</span>) :
              <ul className="links">{this.getLinks()}</ul>}
      </Modal>
    )
  }
});

module.exports = {
  ProductLinksMixin: ProductLinksMixin,
  ProductLinksModal: ProductLinksModal
};
