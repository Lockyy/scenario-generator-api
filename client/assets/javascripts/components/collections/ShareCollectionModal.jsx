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
    FluxModalActions.closeModal();
    if(this.props.router.state.components[0].displayName != 'CollectionPage') {
      FluxCollectionActions.clearCollection();
    }
  },

  showShareCollectionModal: function(collection, config) {
    FluxModalActions.setVisibleModal('ShareCollectionModal', 0, config);
    FluxCollectionActions.fetchedCollection(collection);
  }
};

const ShareCollectionModal = React.createClass ({
  displayName: 'ShareCollectionModal',

  getInitialState: function() {
    return {
      collection: {
        name: '',
        description: '',
        products: [],
        owner: this.context.currentUser,
        users: [],
        emails: []
      },
      config: {}
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChangeCollection);
    ModalStore.listen(this.onChangeModal);
  },
  onChangeCollection: function(data) {
    this.setState({collection: data.data.collection});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible, config: data.config });
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
    this.setState({ user_name: null, collection: collection })
  },

  updateEmails: function(emails) {
    let collection = this.state.collection
    collection.emails = emails
    this.setState({ user_name: null, collection: collection })
  },

  addUser: function(user) {
    let users = this.state.collection.users;
    users.push(_.merge(user, {rank: 'viewer', unsaved: true}))
    this.updateUsers(users);
  },

  addEmail: function(email) {
    let emails = this.state.collection.emails;
    emails.push({email: email, rank: 'viewer', unsaved: true})
    this.updateEmails(emails);
  },

  updateUser: function(id, rank) {
    let users = this.state.collection.users;
    let index = _.findIndex(users, function(user) { return user.id == id })
    if(index > -1) {
      users[index] = _.merge(users[index], {rank: rank})
      this.updateUsers(users)
    }
  },

  updateEmail: function(email, rank) {
    let emails = this.state.collection.emails;
    let index = _.findIndex(emails, function(email_obj) { return email_obj.email == email })
    if(index > -1) {
      emails[index] = _.merge(emails[index], {rank: rank})
      this.updateEmails(emails)
    }
  },

  removeUser: function(user_id) {
    let updatedUsers = this.state.collection.users.filter(function(user) {
      return user.id !== user_id;
    });

    this.updateUsers(updatedUsers);
  },

  removeEmails: function(email) {
    let updatedEmails = this.state.collection.emails.filter(function(email_obj) {
      return email_obj.email !== email;
    });
    this.updateEmails(updatedEmails);
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
    let id    = this.state.collection.id
    let name = this.state.collection.name
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
          name: name,
          text: `Collection shared with ${total} users`
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
                      onSetUser={this.userTypeaheadUpdate}
                      onSetEmail={this.addEmail} />
    )
  },

  unsavedUsers: function() {
    return _.filter(this.state.collection.users, function(user) {
      return user.unsaved
    })
  },

  unsavedEmails: function() {
    return _.filter(this.state.collection.emails, function(email) {
      return email.unsaved
    })
  },

  renderUsers: function() {
    let unsavedUsers = this.unsavedUsers()
    if(this.state.collection.users && unsavedUsers.length > 0) {
      return (
        <Results
          type='sharee-users'
          containerClass='sharee'
          onRemove={this.removeUser}
          onUpdate={this.updateUser}
          data={{data: unsavedUsers}} />
      )
    }
  },

  renderEmails: function() {
    let unsavedEmails = this.unsavedEmails()
    if(this.state.collection.emails && unsavedEmails.length > 0) {
      return (
        <Results
          type='sharee-emails'
          containerClass='sharee'
          onRemove={this.removeEmails}
          onUpdate={this.updateEmail}
          data={{data: unsavedEmails}} />
      )
    }
  },

  renderSendEmailsCheckbox: function() {
    if(this.unsavedEmails().length + this.unsavedUsers().length > 0) {
      return (
        <label className='results-list-padding'>
          <input  type='checkbox' name='emails' onClick={this.setSendEmailInvites}
                  checked={this.state.collection.send_email_invites} />
  ￼       Notify users via email
        </label>
      )
    }
  },

  renderSubmissionButtons: function() {
    return (
      <div className='buttons'>
        { this.state.config.cancel ?
            <button className='btn btn-grey btn-round'
              onClick={this.props.close}>{this.state.config.cancel}</button> : null }
        <button className='btn btn-red btn-round'
          onClick={this.submitForm}>{this.state.config.confirm || 'Finish'}</button>
      </div>
    )
  },

  setSendEmailInvites: function(e) {
    let newValue = $(e.target).is(":checked")
    let updatedCollection = _.merge(this.state.collection, {send_email_invites: newValue})
    this.setState({collection: updatedCollection})
  },

  setPrivacy: function(e) {
    let newValue = $(e.target).val()
    let updatedCollection = _.merge(this.state.collection, {privacy: newValue})
    this.setState({collection: updatedCollection})
  },

  renderPrivacyToggle: function() {
    return (
      <div className='privacy-radios'>
        Who can view this collection?
        <label>
          <input  type='radio' name='privacy' value='hidden' onClick={this.setPrivacy}
                  checked={this.state.collection.privacy == 'hidden'} />
￼         Just me and people I specify below (Private)
        </label>
        <label>
          <input  type='radio' name='privacy' value='visible' onClick={this.setPrivacy}
                  checked={this.state.collection.privacy == 'visible'} />
￼         Everyone in Fletcher (Public). You can still add collaborators.
        </label>
      </div>
    )
  },

  renderShareForm: function() {
    return (
      <div className='row'>
        <form className='col-xs-12 form collection'
              ref='collection_form'>
          {this.renderPrivacyToggle()}
          <div className='grey'>
            <div className='grey-title'>
              Add collaborators to your collection
            </div>
            <div className='grey-description'>
              Add collaborators and manage their access level accordingly. You can add more people from the collection’s page once the collection is created.
            </div>
            {this.renderUserTypeahead()}
            <div className='scrollable'>
              {this.renderEmails()}
              {this.renderUsers()}
            </div>
            {this.renderSendEmailsCheckbox()}
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
          Privacy & Sharing
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
  ShareCollectionMixin: ShareCollectionMixin,
  ShareCollectionModal: ShareCollectionModal
};
