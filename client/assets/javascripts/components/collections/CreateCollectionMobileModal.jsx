import React from 'react';
import  CreateCollectionModal  from './CreateCollectionModal'

const CreateCollectionMobileModal = React.createClass ({
  displayName: 'CreateCollectionModal',
  render: function () {
    let renderInsideForm = <span> test </span>;
    return (
      <div id="create-collection-mobile-modal">
        <CreateCollectionModal
          close={this.props.close} renderInsideForm={renderInsideForm}/>
      </div>
    )
  }
});

export default CreateCollectionMobileModal;