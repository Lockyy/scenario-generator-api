import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import AlertModal from './AlertModal';
import { CreateCollectionMixin } from './collections/CreateCollectionModal'
import { ShareCollectionMixin } from './collections/ShareCollectionModal'

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

const ModalManager = React.createClass ({
  displayName: 'ModalManager',
  mixins: [
    CreateCollectionMixin,
    ShareCollectionMixin,
  ],

  render: function() {
    return (
      <div>
        <AlertModal router={this.props.router} />
        { this.renderCreateCollectionModal() }
        { this.renderShareCollectionModal() }
      </div>
    )
  }
});


export default ModalManager;
