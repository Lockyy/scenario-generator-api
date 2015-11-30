import _ from 'lodash'
import React from 'react'
import timeago from 'timeago'
import { Navigation } from 'react-router'
import DefaultModalStyles from '../utils/constants/DefaultModalStyles';
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
      modalIsOpen: false,
      checked: false
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

  buttonDisabled: function() {
    if(this.state.data.checkbox) {
      return !this.state.checked
    }
    return false
  },

  renderButtons: function() {
    return (
      <div className='alertButtons'>
        { this.state.data.blue ? (
            <button onClick={this.successButton}
                    className='btn btn-round btn-blue-inverted'
                    disabled={this.buttonDisabled()}>
              {this.state.data.success}
            </button>
          ) : (
            <button onClick={this.successButton}
                    className='btn btn-round btn-red'
                    disabled={this.buttonDisabled()}>
              {this.state.data.success}
            </button>
          )
        }
        {this.showCancelButton() ? (<button onClick={this.cancelButton} className='btn btn-round btn-grey'>
                                      {this.state.data.cancel}
                                    </button> ) : null }
      </div>
    )
  },

  checkboxUpdate: function(e) {
    this.setState({
      checked: $(e.target).is(":checked")
    })
  },

  renderCheckbox: function() {
    if(this.state.data.checkbox) {
      return (
        <label className='blue'>
          <input  type="checkbox"
                  onChange={this.checkboxUpdate} />
          {this.state.data.checkbox}
        </label>
      )
    }
  },

  render: function() {
    return (
      <Modal  isOpen={this.state.modalIsOpen}
              style={DefaultModalStyles}
              overlayClassName={'alert-modal'}>
        <div className='header'>
          <span className='title'>
            {this.state.data.title}
          </span>
        </div>
        <div className='message'>
          {this.state.data.message}
        </div>
        <div className='grey'>
          {this.renderCheckbox()}
          {this.renderButtons()}
        </div>
      </Modal>
    )
  },
})

export default AlertModal;
