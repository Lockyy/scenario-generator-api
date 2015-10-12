import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import CollectionBox from './CollectionBox';
import Modal from 'react-modal';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import UserTypeahead from '../UserTypeahead'
import Results from '../search/Results'

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

const CollectionShareMixin = {
  renderCollectionShareModal: function() {
    return (
      <CollectionShareModal
        ref='collectionShareModal'
        visible={this.collectionShareModalVisible()}
        close={this.closeCollectionShareModal}
        onShareCollection={this.onShareCollection} />
    )
  },

  collectionShareModalVisible: function() {
    return this.state && this.state.showCollectionShareModal
  },

  closeCollectionShareModal: function() {
    this.setState({showCollectionShareModal: false})
  },

  showCollectionShareModal: function() {
    this.setState({showCollectionShareModal: true})
  },

  showCollectionShareModalForEditing: function(collection) {
    this.refs.collectionShareModal.setCollection(collection)
    this.showCollectionShareModal()
  },

  onShareCollection: function(data, resolve) {
    FluxCollectionActions.shareCollection(data.id, data.users, resolve)
  }
};

const CollectionShareModal = React.createClass ({
  displayName: 'CollectionShareModal',

  getInitialState: function() {
    return {
      id: '',
      title: '',
      owner: this.context.currentUser
    }
  },

  setCollection: function(collection) {
    this.setState({
      id: collection.id,
      title: collection.title,
      users: collection.users || []
    })
  },

  close: function() {
    this.setState(this.getInitialState());
    this.props.close()
  },

  onFocus: function(e) {
    $(React.findDOMNode(this.refs.fields_container)).addClass('focus')
  },

  onBlur: function(e) {
    $(React.findDOMNode(this.refs.fields_container)).removeClass('focus')
  },

  getUserIDs: function() {
    return _.map(this.state.users, function(user) {
      return user.id
    })
  },

  removeUser: function(user_id) {
    let users = this.state.users.filter(function(user) {
      return user.id !== user_id;
    });

    this.setState({user_name: null, users: users})
  },

  addUser: function(user, selected) {
    if(selected) {
      let newUsers = this.state.users
      newUsers.push(user)
      this.setState({user_name: null, users: newUsers})
    } else {
      this.setState({user_name: user.name})
    }
  },

  submitForm: function(e) {
    e.preventDefault()
    let _this = this

    let data = {
      id: this.state.id,
      title: this.state.title,
      users: this.getUserIDs()
    }

    this.props.onShareCollection(data, function() {
      _this.close(_this)

      FluxNotificationsActions.showNotification({
        type: 'sent-share',
        subject: {
          id: data.id,
          type: 'share',
          name: data.title
        }
      })
    })
  },

  onChangeField: function(name, e) {
    let hash = {}
    hash[name] = e.currentTarget.value
    this.setState(hash)
  },

  renderUserTypeahead: function() {
    return (
      <UserTypeahead  ref='user_typeahead'
                      value={this.state.user_name}
                      helpMessage={'Add User'}
                      hideLabel={true}
                      onSetUser={this.addUser} />
    )
  },

  renderUsers: function() {
    return (
      <Results
        type='users'
        onRemove={this.removeUser}
        data={{data: this.state.users}} />
    )
  },

  renderSubmissionButtons: function() {
    return (
      <div className='buttons'>
        <button className='btn btn-red btn-round'
                onClick={this.submitForm}>Share</button>
      </div>
    )
  },

  renderShareForm: function() {
    return (
      <div className='row'>
        <form className='col-xs-10 col-xs-offset-1 form collection'
              ref='collection_form'>
          {this.renderUserTypeahead()}
          {this.renderUsers()}
          {this.renderSubmissionButtons()}
        </form>
      </div>
    )
  },

  render: function() {
    return (
      <Modal
        isOpen={this.props.visible}>
        <div className='header'>
          <span className='title'>
            Share {this.state.title} with others
          </span>
          <span onClick={this.close} className='close'>x</span>
        </div>
        {this.renderShareForm()}
      </Modal>
    )
  }
});

module.exports = {
  CollectionShareMixin: CollectionShareMixin,
  CollectionShareModal: CollectionShareModal
};
