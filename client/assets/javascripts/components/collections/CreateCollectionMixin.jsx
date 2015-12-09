import React from 'react';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import CreateCollectionModal from './CreateCollectionModal'

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const CreateCollectionMixin = {
  renderCreateCollectionModal: function () {
    return <CreateCollectionModal
      close={this.closeCreateCollectionModal}/>
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


module.exports = {
  CreateCollectionMixin: CreateCollectionMixin
};
