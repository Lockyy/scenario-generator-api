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
import Footer from '../Footer';

const ManageCollaboratorCollectionModalDesktop = React.createClass ({
  displayName: 'ManageCollaboratorCollectionModalDesktop',

  contextTypes: {
    router: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      collection: {
        name: '',
        description: '',
        products: [],
        owner: {},
        users: [],
        emails: [],
        user: {}
      },
      unsaved_collection: {}
    }
  },

  renderOwner: function() {
    let user = this.props.collection.user

    return (
      <div className='results sharee'>
        <div className='sharee-users'>
          <div className='result user sharee'>
            <div className='info'>
              <Avatar
                user={user}
                disableLink={true}
                styles={{backgroundColor: 'white'}} />
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
    if(this.props.unsaved_collection.users && this.props.unsaved_collection.users.length > 0) {
      return (
        <Results
          type='sharee-users'
          className='sharee'
          onRemove={this.props.removeUser}
          onUpdate={this.props.updateUser}
          data={{data: this.props.displayedUsers}} />
      )
    }
  },

  renderEmails: function() {
    if(this.props.unsaved_collection.emails && this.props.unsaved_collection.emails.length > 0) {
      return (
        <Results
          type='sharee-emails'
          className='sharee'
          onRemove={this.props.removeEmail}
          onUpdate={this.props.updateEmail}
          data={{data: this.props.unsaved_collection.emails}} />
      )
    }
  },

  renderSubmissionButtons: function() {
    return (
      <div className='buttons'>
        <button className='btn btn-red-inverted btn-round'
                onClick={this.props.submitForm}>Save</button>
        <button className='btn btn-grey-inverted btn-round'
                onClick={this.props.close}>Cancel</button>
      </div>
    )
  },

  renderShareForm: function() {
    return (
      <div className='row'>
        <form className='col-xs-12 form collection'
              ref='collection_form'>
          <div className='grey'>
            <div className='scrollable'>
              {this.renderOwner()}
              {this.renderUsers()}
              {this.renderEmails()}
            </div>
            {this.renderSubmissionButtons()}
          </div>
        </form>
      </div>
    )
  },

  renderHeader: function() {
    return (
      <div className='header share'>
        <span className='title'>
          Manage existing collaborators access
        </span>
        <a onClick={this.props.close} className='close'></a>
      </div>
    )
  },

  render: function() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderShareForm()}
      </div>
    )
  }
});

export default ManageCollaboratorCollectionModalDesktop;
