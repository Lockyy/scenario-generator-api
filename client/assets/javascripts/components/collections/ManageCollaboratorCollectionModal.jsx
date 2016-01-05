import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import RenderDesktop from '../RenderDesktop';
import RenderMobile from '../RenderMobile';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxAlertActions from '../../actions/FluxAlertActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import ManageCollaboratorCollectionModalDesktop from './ManageCollaboratorCollectionModalDesktop';
import ManageCollaboratorCollectionModalMobile from './ManageCollaboratorCollectionModalMobile';
import UserTypeahead from '../UserTypeahead'
import Results from '../search/Results'
import Avatar from '../Avatar'
import Footer from '../Footer';

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const ManageCollaboratorCollectionMixin = {
  renderManageCollaboratorCollectionModal: function() {
    return (
      <ManageCollaboratorCollectionModal
        ref='manageCollaboratorCollectionModal'
        close={this.closeShareCollectionModal} />
    )
  },

  closeManageCollaboratorCollectionModal: function() {
    FluxModalActions.closeModal();
    if(this.props.router.state.components[0].displayName != 'CollectionPage') {
      FluxCollectionActions.clearCollection();
    }
  },

  showManageCollaboratorCollectionModal: function(collection) {
    FluxModalActions.setVisibleModal('ManageCollaboratorCollectionModal');
    FluxCollectionActions.fetchedCollection(collection);
  }
};

const ManageCollaboratorCollectionModal = React.createClass ({
  displayName: 'ManageCollaboratorCollectionModal',

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      collection: {
        name: '',
        description: '',
        products: [],
        owner: this.context.currentUser,
        users: [],
        emails: [],
        user: {}
      },
      unsaved_collection: {}
    }
  },

  // Flux Methods
  ///////////////

  componentDidMount: function() {
    CollectionStore.listen(this.onChangeCollection);
    ModalStore.listen(this.onChangeModal);
  },
  onChangeCollection: function(data) {
    let unsavedCollection = jQuery.extend(true, {}, data.data.collection)
    this.setState({
      collection: data.data.collection,
      unsaved_collection: unsavedCollection
    });
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },

  // Data handling
  ////////////////

  gatherUsers: function() {
    return _.map(this.state.unsaved_collection.users, function(user) {
      return {
        id: user.id,
        rank: user.rank
      }
    })
  },

  gatherEmails: function() {
    return _.map(this.state.unsaved_collection.emails, function(email) {
      return {
        email: email.email,
        rank: email.rank
      }
    })
  },

  // State changing
  /////////////////

  updateUsers: function(users) {
    let collection = this.state.unsaved_collection
    collection.users = users
    this.setState({ unsaved_collection: collection })
    if(this.refs.filterInput) {
      this.filterCollaborators($(this.refs.filterInput.getDOMNode()).val())
    }
  },

  updateEmails: function(emails) {
    let collection = this.state.unsaved_collection
    collection.emails = emails
    this.setState({ user_name: null, unsaved_collection: collection })
  },

  updateEmail: function(email, rank) {
    let emails = this.state.unsaved_collection.emails;
    let index = _.findIndex(emails, function(email_obj) { return email_obj.email == email })
    if(index > -1) {
      emails[index] = _.merge(emails[index], {rank: rank})
      this.updateEmails(emails) }
  },

  updateUser: function(id, rank) {
    let users = this.state.unsaved_collection.users;
    let index = _.findIndex(users, function(user) { return user.id == id })
    if(index > -1) {
      users[index] = _.merge(users[index], {rank: rank})
      this.updateUsers(users)
    }
  },

  removeUser: function(user_id) {
    let updatedUsers = this.state.unsaved_collection.users.filter(function(user) {
      return user.id !== user_id;
    });

    this.updateUsers(updatedUsers);
  },

  removeEmail: function(email) {
    let updatedEmails = this.state.unsaved_collection.emails.filter(function(email_obj) {
      return email_obj.email !== email;
    });
    this.updateEmails(updatedEmails);
  },

  filterCollaborators: function(val) {
    let displayedUsers = _.filter(this.state.unsaved_collection.users, function(user) {
      if(_.indexOf(['owner', 'co-owner', 'coowner', 'is co-owner', 'is coowner'], val.toLowerCase()) > -1) {
        if(user.rank == 'owner') { return true }
      }
      if(_.indexOf(['edit', 'edito', 'editor', 'collaborator', 'add products', 'can add products'], val.toLowerCase()) > -1) {
        if(user.rank == 'collaborator') { return true }
      }
      if(_.indexOf(['viewer', 'viewe', 'can view', 'view'], val.toLowerCase()) > -1) {
        if(user.rank == 'viewer') { return true }
      }
      if(val.length == 0) { return true }
      return new RegExp(val.toLowerCase() + "+").test(user.name.toLowerCase())
    })

    this.setState({displayedUsers: displayedUsers})
  },

  submitForm: function(e) {
    e.preventDefault()

    let _this = this
    let id    = this.state.collection.id
    let name  = this.state.collection.name
    let total = this.state.unsaved_collection.users.length + this.state.unsaved_collection.emails.length

    let data = {
      users: this.gatherUsers(),
      emails: this.gatherEmails(),
      privacy: this.state.unsaved_collection.privacy,
      send_email_invites: this.state.collection.send_email_invites
    }

    FluxCollectionActions.shareCollection(id, data, function() {
      _this.close()

      FluxNotificationsActions.showNotification({
        type: 'shared',
        text: 'Your changes were saved successfully',
        subject: {
          id: id,
          type: 'Collection',
          name: name,
        }
      })
    })
  },

  setPrivacy: function(val) {
    let message, button, title;
    let _this = this;

    if(val == 'hidden') {
      title = 'Make this collection private?'
      message = 'Are you sure you want to make this collection private? Only Fletcher users you share it with will be able to see it.'
      button = 'Make Private'
    } else {
      title = 'Make this collection public?'
      message = 'Are you sure you want to make this collection public? All Fletcher users will be able to view it.'
      button = 'Make Public'
    }

    FluxAlertActions.showAlert({
      title: title,
      blue: true,
      success: button,
      cancel: 'Cancel',
      message: message,
      showClose: true,
      headerIconClass: 'collections',
      successCallback: function() {
        let updatedCollection = _.merge(_this.state.unsaved_collection, {privacy: val})
        _this.setState({unsaved_collection: updatedCollection})
      }
    })
  },

  close: function(e) {
    if(e) { e.preventDefault() }
    this.setState({ collection: this.state.unsaved_collection });
    this.props.close();
  },

  // Rendering
  ////////////

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.close}
        style={DefaultModalStyles}>

        <RenderDesktop
          component={ManageCollaboratorCollectionModalDesktop}
          displayedUsers={this.state.unsaved_collection.users}
          collection={this.state.collection}
          unsaved_collection={this.state.unsaved_collection}
          close={this.close}
          updateUser={this.updateUser}
          removeUser={this.removeUser}
          updateEmail={this.updateEmail}
          removeEmail={this.removeEmail}
          submitForm={this.submitForm}
          filterCollaborators={this.filterCollaborators} />

        <RenderMobile
          component={ManageCollaboratorCollectionModalMobile}
          displayedUsers={this.state.displayedUsers}
          collection={this.state.collection}
          unsaved_collection={this.state.unsaved_collection}
          close={this.close}
          updateUser={this.updateUser}
          removeUser={this.removeUser}
          updateEmail={this.updateEmail}
          removeEmail={this.removeEmail}
          submitForm={this.submitForm}
          setPrivacy={this.setPrivacy} />

      </Modal>
    )
  }
});

module.exports = {
  ManageCollaboratorCollectionMixin: ManageCollaboratorCollectionMixin,
  ManageCollaboratorCollectionModal: ManageCollaboratorCollectionModal
};
