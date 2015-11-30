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
        title: '',
        description: '',
        products: [],
        owner: this.context.currentUser,
        users: [],
        emails: [],
        user: {}
      }
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChangeCollection);
    ModalStore.listen(this.onChangeModal);
  },
  onChangeCollection: function(data) {
    this.setState({collection: data.data.collection, displayedUsers: data.data.collection.users});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },

  // Gather users currently associated with the collection
  gatherUsers: function() {
    return _.map(this.state.collection.users, function(user) {
      return {
        id: user.id,
        rank: user.rank
      }
    })
  },

  // Gather the emails currently having this collection shared with them
  gatherEmails: function() {
    return _.map(this.state.collection.emails, function(email) {
      return {
        email: email.email,
        rank: email.rank
      }
    })
  },

  updateUsers: function(users) {
    let collection = this.state.collection
    collection.users = users
    this.setState({ collection: collection })
  },

  updateUser: function(id, rank) {
    let users = this.state.collection.users;
    let index = _.findIndex(users, function(user) { return user.id == id })
    if(index > -1) {
      users[index] = _.merge(users[index], {rank: rank})
      this.updateUsers(users)
    }
  },

  removeUser: function(user_id) {
    let updatedUsers = this.state.collection.users.filter(function(user) {
      return user.id !== user_id;
    });

    this.updateUsers(updatedUsers);
  },

  filterCollaborators: function(e) {
    let val = $(e.target).val()
    let displayedUsers = _.filter(this.state.collection.users, function(user) {
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
    let title = this.state.collection.title
    let total = this.state.collection.users.length + this.state.collection.emails.length

    let data = {
      users: this.gatherUsers(),
      emails: this.gatherEmails(),
      privacy: this.state.collection.privacy,
      send_email_invites: this.state.collection.send_email_invites
    }

    FluxCollectionActions.shareCollection(id, data, function() {
      _this.props.close()

      FluxNotificationsActions.showNotification({
        type: 'shared',
        subject: {
          id: id,
          type: 'Collection',
          name: title,
          text: `Collection shared with ${total} users`
        }
      })
    })
  },

  renderUserTypeahead: function() {
    return (
      <div className='twitter-typeahead filtering'>
        <input
          className='form-control tt-input'
          placeholder='Search Collaborators'
          onChange={this.filterCollaborators} />
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
            <div className='color-red'>Owner</div>
          </div>
        </div>
      </div>
    )
  },

  renderUsers: function() {
    if(this.state.collection.users && this.state.collection.users.length > 0) {
      return (
        <Results
          type='sharee-users'
          containerClass='sharee'
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
                onClick={this.props.close}>Cancel</button>
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
      <div className='header'>
        <span className='title'>
          Manage collaborators access
        </span>
        <span onClick={this.props.close} className='close'>x</span>
      </div>
    )
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.props.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.props.close}>{"< Close"}</div>
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
