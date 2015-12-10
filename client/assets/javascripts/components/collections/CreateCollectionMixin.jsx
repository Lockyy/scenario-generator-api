import React from 'react';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import CreateCollectionDesktopModal from './CreateCollectionDesktopModal'
import CreateCollectionMobileModal from './CreateCollectionMobileModal'

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const CreateCollectionMixin = {
  renderCreateCollectionModal: function () {
    let mobileModal = <CreateCollectionMobileModal
      close={this.closeCreateCollectionModal}/>;

    let desktopModal = <CreateCollectionDesktopModal
      close={this.closeCreateCollectionModal}/>;

    let modal = $(window).width() <= 768 ? mobileModal : desktopModal;
    return {modal}
  },

  closeCreateCollectionModal: function () {
    FluxModalActions.closeModal();
    FluxCollectionActions.clearCollection();
  },

  showCreateCollectionModal: function (details) {
    FluxCollectionActions.fetchedCollection({
      name: (details.name || ''),
      products: (details.products || []),
      description: '',
      users: [],
      user: {}
    });
    FluxModalActions.setVisibleModal('CreateCollectionModal')
  }
};

export default CreateCollectionMixin;
