import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import AlertModal from './AlertModal';
import  CreateCollectionMixin from './collections/CreateCollectionMixin';
import { ShareCollectionMixin } from './collections/ShareCollectionModal';
import { AddToCollectionMixin } from './collections/AddToCollectionModal';
import { ViewCollectionMixin } from './collections/ViewCollectionModal';
import { EditCollectionMixin } from './collections/EditCollectionModal';
import { CollaboratorCollectionMixin } from './collections/CollaboratorCollectionModal';
import { ShareProductMixin } from './products/ShareProductModal';
import { ProductFilesMixin } from './products/ProductFilesModal';
import { ProductLinksMixin } from './products/ProductLinksModal';

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

const ModalManager = React.createClass ({
  displayName: 'ModalManager',
  mixins: [
    Navigation,
    CreateCollectionMixin,
    ShareCollectionMixin,
    AddToCollectionMixin,
    ViewCollectionMixin,
    EditCollectionMixin,
    ShareProductMixin,
    ProductFilesMixin,
    ProductLinksMixin,
    CollaboratorCollectionMixin,
  ],

  render: function() {
    return (
      <div>
        <AlertModal router={this.props.router} />
        { this.renderCreateCollectionModal() }
        { this.renderShareCollectionModal() }
        { this.renderAddToCollectionModal() }
        { this.renderViewCollectionModal() }
        { this.renderEditCollectionModal() }
        { this.renderShareProductModal() }
        { this.renderProductFilesModal() }
        { this.renderProductLinksModal() }
        { this.renderCollaboratorCollectionModal() }
      </div>
    )
  }
});


export default ModalManager;
