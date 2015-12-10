import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles'
import FluxAlertActions from '../../actions/FluxAlertActions';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import UserTypeahead from '../UserTypeahead'
import Results from '../search/Results'

const ShareCollection = React.createClass ({
  displayName: 'ShareCollection',

  getInitialState: function () {
    return {
      collection: {
        name: '',
        description: '',
        products: [],
        owner: this.context.currentUser,
        users: [],
        emails: []
      },
      config: {},
      unsaved_collection: {}
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function () {
    CollectionStore.listen(this.onChangeCollection);
  },

  onChangeCollection: function (data) {
    let unsavedCollection = jQuery.extend(true, {}, data.data.collection)
    this.setState({
      collection: data.data.collection,
      unsaved_collection: unsavedCollection
    });
  },

  onChangeModal: function (data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({visible: visible, config: data.config});
  },

  // Gather users currently associated with the collection
  gatherUsers: function () {
    return _.map(this.state.unsaved_collection.users, function (user) {
      return {
        id: user.id,
        rank: user.rank
      }
    })
  },

  // Gather the emails currently having this collection shared with them
  gatherEmails: function () {
    return _.map(this.state.unsaved_collection.emails, function (email) {
      return {
        email: email.email,
        rank: email.rank
      }
    })
  },

  updateUsers: function (users) {
    let collection = this.state.unsaved_collection
    collection.users = users
    this.setState({user_name: null, unsaved_collection: collection})
  },

  updateEmails: function (emails) {
    let collection = this.state.unsaved_collection
    collection.emails = emails
    this.setState({user_name: null, unsaved_collection: collection})
  },

  addUser: function (user) {
    let users = this.state.unsaved_collection.users;
    users.push(_.merge(user, {rank: 'viewer', unsaved: true}))
    this.updateUsers(users);
  },

  addEmail: function (email) {
    let emails = this.state.unsaved_collection.emails;
    emails.push({email: email, rank: 'viewer', unsaved: true})
    this.updateEmails(emails);
  },

  updateUser: function (id, rank) {
    let users = this.state.unsaved_collection.users;
    let index = _.findIndex(users, function (user) {
      return user.id == id
    })
    if (index > -1) {
      users[index] = _.merge(users[index], {rank: rank})
      this.updateUsers(users)
    }
  },

  updateEmail: function (email, rank) {
    let emails = this.state.unsaved_collection.emails;
    let index = _.findIndex(emails, function (email_obj) {
      return email_obj.email == email
    })
    if (index > -1) {
      emails[index] = _.merge(emails[index], {rank: rank})
      this.updateEmails(emails)
    }
  },

  removeUser: function (user_id) {
    let updatedUsers = this.state.unsaved_collection.users.filter(function (user) {
      return user.id !== user_id;
    });

    this.updateUsers(updatedUsers);
  },

  removeEmails: function (email) {
    let updatedEmails = this.state.unsaved_collection.emails.filter(function (email_obj) {
      return email_obj.email !== email;
    });
    this.updateEmails(updatedEmails);
  },

  userTypeaheadUpdate: function (user, selected) {
    if (selected) {
      this.addUser(user);
    } else {
      this.setState({user_name: user.name})
    }
  },

  submitForm: function (e) {
    e.preventDefault()

    let _this = this
    let id = this.state.collection.id;
    let name = this.state.collection.name;
    let total = this.state.unsaved_collection.users.length + this.state.unsaved_collection.emails.length;

    let data = {
      users: this.gatherUsers(),
      emails: this.gatherEmails(),
      privacy: this.state.unsaved_collection.privacy,
      send_email_invites: this.state.collection.send_email_invites
    };

    FluxCollectionActions.shareCollection(id, data, function () {
      _this.close();

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

  renderUserTypeahead: function () {
    return (
      <UserTypeahead ref='user_typeahead'
                     value={this.state.user_name}
                     helpMessage={'Add User'}
                     hideLabel={true}
                     onSetUser={this.userTypeaheadUpdate}
                     onSetEmail={this.addEmail}/>
    )
  },

  unsavedUsers: function () {
    return _.filter(this.state.unsaved_collection.users, function (user) {
      return user.unsaved
    })
  },

  unsavedEmails: function () {
    return _.filter(this.state.unsaved_collection.emails, function (email) {
      return email.unsaved
    })
  },

  renderUsers: function () {
    let unsavedUsers = this.unsavedUsers()
    if (this.state.unsaved_collection.users && unsavedUsers.length > 0) {
      return (
        <Results
          type='sharee-users'
          className='sharee'
          onRemove={this.removeUser}
          onUpdate={this.updateUser}
          data={{data: unsavedUsers}}/>
      )
    }
  },

  renderEmails: function () {
    let unsavedEmails = this.unsavedEmails()
    if (this.state.unsaved_collection.emails && unsavedEmails.length > 0) {
      return (
        <Results
          type='sharee-emails'
          className='sharee'
          onRemove={this.removeEmails}
          onUpdate={this.updateEmail}
          data={{data: unsavedEmails}}/>
      )
    }
  },

  renderSendEmailsCheckbox: function () {
    if (this.unsavedEmails().length + this.unsavedUsers().length > 0) {
      return (
        <label className='results-list-padding grey'>
          <input type='checkbox' name='emails' onClick={this.setSendEmailInvites}
                 checked={this.state.collection.send_email_invites}/>
          Notify users via email
        </label>
      )
    }
  },

  renderSubmissionButtons: function () {
    return (
      <div className='buttons'>
        { this.state.config.cancel ?
        <button className='btn btn-grey btn-round'
                onClick={this.close}>{this.state.config.cancel}</button> : null }
        <button className='btn btn-red btn-round'
                onClick={this.submitForm}>{this.state.config.confirm || 'Finish'}</button>
      </div>
    )
  },

  setSendEmailInvites: function (e) {
    let newValue = $(e.target).is(":checked")
    let updatedCollection = _.merge(this.state.unsaved_collection, {send_email_invites: newValue})
    this.setState({unsaved_collection: updatedCollection})
  },

  setPrivacy: function (e) {
    let newValue = $(e.target).val()
    let message, button, title;
    let _this = this;

    if (newValue == 'hidden') {
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
      successCallback: function () {
        let updatedCollection = _.merge(_this.state.unsaved_collection, {privacy: newValue})
        _this.setState({unsaved_collection: updatedCollection})
      }
    })
  },

  renderPrivacyToggle: function () {
    if (!this.state.config.hideRadios) {
      return (
        <div className='privacy-radios'>
          Who can view this collection?
          <label>
            <input type='radio' name='privacy' value='hidden' onClick={this.setPrivacy}
                   checked={this.state.unsaved_collection.privacy == 'hidden'}/>
            Just me and people I specify below (Private)
          </label>
          <label>
            <input type='radio' name='privacy' value='visible' onClick={this.setPrivacy}
                   checked={this.state.unsaved_collection.privacy == 'visible'}/>
            Everyone in Fletcher (Public). You can still add collaborators.
          </label>
        </div>
      )
    }
  },

  render: function () {
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
              Add collaborators and manage their access level accordingly. You can add more people from the collection’s
              page once the collection is created.
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
  }
});

export default ShareCollection;