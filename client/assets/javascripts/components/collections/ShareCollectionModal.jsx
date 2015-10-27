import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import UserTypeahead from '../UserTypeahead'
import Results from '../search/Results'

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const ShareCollectionMixin = {

  renderShareCollectionModal: function() {
    return (
      <ShareCollectionModal
        ref='collectionShareModal'
        close={this.closeShareCollectionModal} />
    )
  },

  closeShareCollectionModal: function() {
    $('body').removeClass('no-scroll');
    FluxModalActions.closeModal()
  },

  showShareCollectionModal: function(collection) {
    $(window).scrollTop(0);
    $('body').addClass('no-scroll');
    FluxModalActions.setVisibleModal('ShareCollectionModal');
    FluxCollectionActions.fetchedCollection(collection);
  }
};

const ShareCollectionModal = React.createClass ({
  displayName: 'ShareCollectionModal',

  getInitialState: function() {
    return {
      data: {
        collection: {
          title: '',
          description: '',
          products: [],
          owner: this.context.currentUser
        }
      }
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChange);
    ModalStore.listen(this.onChangeModal);
  },
  onChange: function(data) {
    this.setState({data: data.data});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },

  // Gather the IDs for the users currently being shared to.
  getUserIDs: function() {
    return _.map(this.state.data.collection.users, function(user) {
      return user.id
    })
  },

  updateUsers: function(users) {
    let collection = this.state.data.collection
    collection.users = users
    this.setState({ user_name: null, data: { collection: collection }})
  },

  removeUser: function(user_id) {
    let updatedUsers = this.state.data.collection.users.filter(function(user) {
      return user.id !== user_id;
    });

    this.updateUsers(updatedUsers);
  },

  addUser: function(user) {
    let users = this.state.data.collection.users;
    users.push(user)
    this.updateUsers(users);
  },

  userTypeaheadUpdate: function(user, selected) {
    if(selected) {
      this.addUser(user);
    } else {
      this.setState({user_name: user.name})
    }
  },

  submitForm: function(e) {
    e.preventDefault()

    let _this = this
    let id    = this.state.data.collection.id
    let title = this.state.data.collection.title
    let users = this.getUserIDs()

    FluxCollectionActions.shareCollection(id, users, function() {
      _this.props.close()

      FluxNotificationsActions.showNotification({
        type: 'sent-share',
        subject: {
          id: id,
          type: 'share',
          name: title
        }
      })
    })
  },

  renderUserTypeahead: function() {
    return (
      <UserTypeahead  ref='user_typeahead'
                      value={this.state.user_name}
                      helpMessage={'Add User'}
                      hideLabel={true}
                      onSetUser={this.userTypeaheadUpdate} />
    )
  },

  renderUsers: function() {
    return (
      <Results
        type='users'
        onRemove={this.removeUser}
        data={{data: this.state.data.collection.users}} />
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

  renderheader: function() {
    return (
      <div className='header'>
        <span className='title'>
          Share {this.state.data.collection.title} with others
        </span>
        <span onClick={this.close} className='close'>x</span>
      </div>
    )
  },

  render: function() {
    return (
      <Modal isOpen={this.state.visible}>
        <div className='back-button' onClick={this.close}>{"< Close"}</div>
        {this.renderheader()}
        {this.renderShareForm()}
      </Modal>
    )
  }
});

module.exports = {
  ShareCollectionMixin: ShareCollectionMixin,
  ShareCollectionModal: ShareCollectionModal
};
