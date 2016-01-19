import React from 'react';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import CreateCollectionDesktopModal from './CreateCollectionDesktopModal'
import CreateCollectionMobileModal from './CreateCollectionMobileModal'
import RenderMobile from '../RenderMobile'
import RenderDesktop from '../RenderDesktop'

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const CreateCollectionMixin = {
  renderCreateCollectionModal: function () {
    return (
        <div>
          <RenderMobile component={CreateCollectionMobileModal} close={this.closeCreateCollectionModal} />
          <RenderDesktop component={CreateCollectionDesktopModal} close={this.closeCreateCollectionModal} />
        </div>
    )
  }
  ,

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
