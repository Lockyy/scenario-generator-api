import React from 'react';
import  CreateCollectionModal  from './CreateCollectionModal'
import  ShareCollection  from './ShareCollection'
import  Links  from '../Links'

const CreateCollectionMobileModal = React.createClass ({
  displayName: 'CreateCollectionModal',
  render: function () {
    let renderInsideForm = <ShareCollection/>;
    return (
      <div id="create-collection-mobile-modal">
        <CreateCollectionModal
          close={this.props.close}
          renderInsideForm={renderInsideForm}
          footer={<Links/>}
        />
      </div>
    )
  }
});

export default CreateCollectionMobileModal;