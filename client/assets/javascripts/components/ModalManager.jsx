import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import AlertModal from './AlertModal';

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

const ModalManager = React.createClass ({
  displayName: 'ModalManager',

  render: function() {
    return (
      <div>
        <AlertModal router={this.props.router} />
      </div>
    )
  }
});


export default ModalManager;
