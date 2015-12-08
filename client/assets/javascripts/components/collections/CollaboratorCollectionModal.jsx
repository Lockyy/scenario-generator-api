import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import UserTypeahead from '../UserTypeahead'
import Results from '../search/Results'
import Avatar from '../Avatar'

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const CollaboratorCollectionMixin = {
  renderCollaboratorCollectionModal: function() {
    return (
      <CollaboratorCollectionModal
        ref='collectionShareModal'
        close={this.closeShareCollectionModal} />
    )
  },

  closeCollaboratorCollectionModal: function() {
    FluxModalActions.closeModal();
    if(this.props.router.state.components[0].displayName != 'CollectionPage') {
      FluxCollectionActions.clearCollection();
    }
  },

  showCollaboratorCollectionModal: function(collection) {
    FluxModalActions.setVisibleModal('CollaboratorCollectionModal');
    FluxCollectionActions.fetchedCollection(collection);
  }
};

const CollaboratorCollectionModal = React.createClass ({
  displayName: 'CollaboratorCollectionModal',

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
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChangeCollection);
    ModalStore.listen(this.onChangeModal);
  },
  onChangeCollection: function(data) {
    let unsavedCollection = jQuery.extend(true, {}, data.data.collection)
    this.setState({
      collection: data.data.collection,
      displayedUsers: unsavedCollection.users,
      unsaved_collection: unsavedCollection
    });
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },

  // Gather users currently associated with the collection
  gatherUsers: function() {
    return _.map(this.state.unsaved_collection.users, function(user) {
      return {
        id: user.id,
        rank: user.rank
      }
    })
  },

  // Gather the emails currently having this collection shared with them
  gatherEmails: function() {
    return _.map(this.state.unsaved_collection.emails, function(email) {
      return {
        email: email.email,
        rank: email.rank
      }
    })
  },

  updateUsers: function(users) {
    let collection = this.state.unsaved_collection
    collection.users = users
    this.setState({ unsaved_collection: collection })
    this.filterCollaborators($(this.refs.filterInput.getDOMNode()).val())
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
      privacy: this.state.collection.privacy,
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

  renderUserTypeahead: function() {
    return (
      <div className='twitter-typeahead filtering'>
        <input
          className='form-control tt-input'
          ref='filterInput'
          placeholder='Search Collaborators'
          onChange={(e) => this.filterCollaborators($(e.target).val())} />
      </div>
    )
  },

  renderOwner: function() {
    let user = this.state.collection.user

    return (
      <div className='results sharee'>
        <div className='sharee-users'>
          <div className='result user sharee'>
            <div className='info'>
              <Avatar url={user.avatar_url} styles={{backgroundColor: 'white'}}/>
              <span>
                <div className='name color-red'>
                  { user.name }
                </div>
              </span>
            </div>
            <div className='color-red owner-rank-title'>Owner</div>
          </div>
        </div>
      </div>
    )
  },

  renderUsers: function() {
    if(this.state.unsaved_collection.users && this.state.unsaved_collection.users.length > 0) {
      return (
        <Results
          type='sharee-users'
          className='sharee'
          onRemove={this.removeUser}
          onUpdate={this.updateUser}
          data={{data: this.state.displayedUsers}} />
      )
    }
  },

  renderSubmissionButtons: function() {
    return (
      <div className='buttons'>
        <button className='btn btn-red-inverted btn-round'
                onClick={this.submitForm}>Save</button>
        <button className='btn btn-grey btn-round'
                onClick={this.close}>Cancel</button>
      </div>
    )
  },

  renderShareForm: function() {
    return (
      <div className='row'>
        <form className='col-xs-12 form collection'
              ref='collection_form'>
          {this.renderUserTypeahead()}
          <div className='grey'>
            <div className='scrollable'>
              {this.renderOwner()}
              {this.renderUsers()}
            </div>
            {this.renderSubmissionButtons()}
          </div>
        </form>
      </div>
    )
  },

  renderheader: function() {
    return (
      <div className='header share'>
        <span className='title'>
          Manage collaborators access
        </span>
        <a onClick={this.close} className='close'></a>
      </div>
    )
  },

  close: function(e) {
    if(e) { e.preventDefault() }
    this.setState({unsaved_collection: this.state.collection})
    this.props.close()
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.close}>{"< Close"}</div>
        {this.renderheader()}
        {this.renderShareForm()}
      </Modal>
    )
  }
});

module.exports = {
  CollaboratorCollectionMixin: CollaboratorCollectionMixin,
  CollaboratorCollectionModal: CollaboratorCollectionModal
};
