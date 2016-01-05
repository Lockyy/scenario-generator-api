import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import ProductStore from '../../stores/ProductStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxModalActions from '../../actions/FluxModalActions';

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const ShareProductMixin = {
  renderShareProductModal: function() {
    return <ShareProductModal
              close={this.closeShareProductModal}/>
  },

  closeShareProductModal: function() {
    FluxModalActions.closeModal();
  },

  showShareProductModal: function() {
    FluxModalActions.setVisibleModal('ShareProductModal')
  },
};

const ShareProductModal = React.createClass ({
  displayName: 'ShareProductModal',
  mixins: [ ShareProductMixin ],

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

  getLink: function() {
    return window.location.href
  },

  copyLink: function() {
    let copyTextarea = $(this.refs.locationLink.getDOMNode());
    let linkCopyButton = $(this.refs.linkCopyButton.getDOMNode())
    copyTextarea.select();

    try {
      let successful = document.execCommand('copy');
      linkCopyButton.html('Copied!')
      setTimeout(function() { linkCopyButton.html('Copy Link') }, 2000)
    } catch (err) { console.log('Oops, unable to copy'); }
    copyTextarea.blur()
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.props.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.props.close}>Back</div>
        <div className='header share'>
          <span className='title'>
            Share this product with other users
          </span>
          <span onClick={this.props.close} className='close'></span>
        </div>
        <div className="input-group">
          <input type="text"
                 className="form-control"
                 aria-describedby="basic-addon2"
                 value={this.getLink()}
                 readOnly={true}
                 ref='locationLink' />
          <span className="input-group-addon copy-link"
                id="basic-addon2"
                ref='linkCopyButton'
                onClick={this.copyLink}>Copy Link</span>
        </div>
      </Modal>
    )
  }
});

module.exports = {
  ShareProductMixin: ShareProductMixin,
  ShareProductModal: ShareProductModal
};
