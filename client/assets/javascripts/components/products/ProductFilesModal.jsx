import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import ProductStore from '../../stores/ProductStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxModalActions from '../../actions/FluxModalActions';
import FileHelper from '../../utils/helpers/FileHelper';
import UrlHelper from '../../utils/helpers/UrlHelper';
import timeago from 'timeago';

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const ProductFilesMixin = {
  renderProductFilesModal: function() {
    return <ProductFilesModal
              close={this.closeProductFilesModal}/>
  },

  closeProductFilesModal: function() {
    FluxModalActions.closeModal();
  },

  showProductFilesModal: function() {
    FluxModalActions.setVisibleModal('ProductFilesModal')
  },
};

const ProductFilesModal = React.createClass ({
  displayName: 'ProductFilesModal',
  mixins: [ ProductFilesMixin ],

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

  getAttachments: function() {
    return _.collect(this.getProductData('attachments'), function(attachment) {
      return (<li className='attachment'>
        {FileHelper.isImage(attachment.name) ?
          <img src={UrlHelper.addProtocol(attachment.url)} className='thumbnail' width='50px' />
          : ''}

        <div className='attachment-details'>
          <a className="attachment-link" href={UrlHelper.addProtocol(attachment.url)} target='_blank'>{attachment.name}</a>
          <span className='author'>{attachment.author ? `Uploaded by ${attachment.author.name}` : ''}</span>
          <span className='created_at'>{timeago(attachment.created_at)}</span>
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
            Files Added
          </span>
          <span onClick={this.props.close} className='close'></span>
        </div>
        {_.isEmpty(this.getProductData('attachments')) ? (<span className='message'>No files have been added</span>) :
              <ul className="attachments">{this.getAttachments()}</ul>}
      </Modal>
    )
  }
});

module.exports = {
  ProductFilesMixin: ProductFilesMixin,
  ProductFilesModal: ProductFilesModal
};
