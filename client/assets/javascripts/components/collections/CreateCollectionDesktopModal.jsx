import React from 'react';
import  CreateCollectionModal  from './CreateCollectionModal'

const CreateCollectionDesktopModal = React.createClass ({
  displayName: 'CreateCollectionModal',
  render: function () {
    return (
      <div id="create-collection-desktop-modal">
        <CreateCollectionModal
          close={this.props.close}
          showShareStep='true'
        />
      </div>
    )
  }
});

export default CreateCollectionDesktopModal;