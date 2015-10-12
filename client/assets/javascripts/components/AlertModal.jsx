import _ from 'lodash'
import React from 'react'
import timeago from 'timeago'
import { Link, Navigation } from 'react-router'
import Modal from 'react-modal'
import AlertStore from '../stores/AlertStore'

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

// Displays an modal with a success button and an optional cancel button.
// Use it like this:
//
//  FluxAlertActions.showAlert({
//    title: 'Cancel review?',
//    success: 'Yes, Cancel Review',
//    cancel:  'No, Continue Review',
//    successCallback: function() {_this.context.router.transitionTo('/app')},
//    cancelCallback: function() {},
//  })

const AlertModal = React.createClass({
  displayName: 'AlertModal',
  mixins: [ Navigation ],

  getInitialState: function() {
    return {
      data: {
        title: 'This is an alert',
        success: 'Success',
        cancel: 'Cancel'
      },
      modalIsOpen: false
    };
  },

  componentDidMount: function() {
    AlertStore.listen(this.onChange.bind(this));
  },

  onChange: function(data) {
    let newData = $.extend(data, {modalIsOpen: true})
    this.setState(newData);
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  successButton: function() {
    this.state.data.successCallback();
    this.setState(this.getInitialState())
  },

  cancelButton: function() {
    if(this.state.data.cancelCallback) {
      this.state.data.cancelCallback();
    }

    this.setState(this.getInitialState())
  },

  showCancelButton: function() {
    if(this.state.data.cancelCallback || this.state.data.cancel) {
      return true
    }
    return false
  },

  renderButtons: function() {
    return (
      <div className='alertButtons'>
        {this.showCancelButton() ? (<button onClick={this.cancelButton} className='btn btn-round btn-grey'>
                                      {this.state.data.cancel}
                                    </button> ) : null }
        <button onClick={this.successButton} className='btn btn-round btn-red'>
          {this.state.data.success}
        </button>
      </div>
    )
  },

  render: function() {
    return (
      <Modal isOpen={this.state.modalIsOpen}>
        <div className='header'>
          <span className='title'>
            {this.state.data.title}
          </span>
        </div>
        <div className='message'>
          {this.state.data.message}
        </div>
        {this.renderButtons()}
      </Modal>
    )
  },
})

export default AlertModal;
