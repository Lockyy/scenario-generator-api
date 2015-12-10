import React from 'react';
import  CreateCollectionModal  from './CreateCollectionModal'

const CreateCollectionMobileModal = React.createClass ({
  displayName: 'CreateCollectionModal',
  render: function () {
    return (
      <div id="create-collection-mobile-modal">
        <CreateCollectionModal
          close={this.props.close}
          renderSharePrivacy='true'
        />
      </div>
    )
  }
});

export default CreateCollectionMobileModal;