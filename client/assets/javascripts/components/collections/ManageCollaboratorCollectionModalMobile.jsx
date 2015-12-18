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
import SliderToggle from '../SliderToggle';

const ManageCollaboratorCollectionModalMobile = React.createClass ({
  displayName: 'ManageCollaboratorCollectionModalMobile',

  contextTypes: {
    router: React.PropTypes.object
  },

  avatarSize: 50,

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

  // Getters
  //////////

  owners: function(emails) {
    let list = emails ? this.props.unsaved_collection.emails : this.props.unsaved_collection.users;
    return _.filter(list, function(user) {
      return user.rank == 'owner';
    })
  },

  collaborators: function(emails) {
    let list = emails ? this.props.unsaved_collection.emails : this.props.unsaved_collection.users;
    return _.filter(list, function(user) {
      return user.rank == 'collaborator';
    })
  },

  viewers: function(emails) {
    let list = emails ? this.props.unsaved_collection.emails : this.props.unsaved_collection.users;
    return _.filter(list, function(user) {
      return user.rank == 'viewer';
    })
  },

  // Rendering
  ////////////

  renderOwnerView: function() {
    if (this.props.collection.owned) {
      return (
        <div className='reverse-top-margin'>
          {this.renderOwners()}
          {this.renderCollaborators()}
          {this.renderViewers()}
          {this.renderSaveButton()}
        </div>
      )
    }
  },

  renderSaveButton: function() {
    return (
      <div className='buttons top-margin-2'>
        <button className='btn btn-red btn-round'
                onClick={this.props.submitForm}>Save</button>
        <button className='btn btn-grey btn-round'
                onClick={this.props.close}>Cancel</button>
      </div>
    )
  },

  renderOwners: function() {
    let _this = this
    return (
      <div>
        <div className='light-grey-bottom-border vertical-padding medium-text'>
          Owners
        </div>

        <div className='light-grey-bottom-border vertical-padding'>
          <Avatar
            user={this.props.collection.user}
            disableLink={true}
            size={this.avatarSize} />
        </div>

        <Results
          type='sharee-users'
          className='sharee'
          onRemove={this.props.removeUser}
          onUpdate={this.props.updateUser}
          data={{data: this.owners()}} />

        <Results
          type='sharee-emails'
          className='sharee'
          onRemove={this.props.removeEmail}
          onUpdate={this.props.updateEmail}
          data={{data: this.owners(true)}} />

      </div>
    )
  },

  renderCollaborators: function() {
    let _this = this

    let collaborators = this.collaborators()
    if(collaborators.length <= 0) { return }

    return (
      <div>
        <div className='light-grey-bottom-border vertical-padding medium-text'>
          Can add products
        </div>

        <Results
          type='sharee-users'
          className='sharee'
          onRemove={this.props.removeUser}
          onUpdate={this.props.updateUser}
          data={{data: this.collaborators()}} />

        <Results
          type='sharee-emails'
          className='sharee'
          onRemove={this.props.removeEmail}
          onUpdate={this.props.updateEmail}
          data={{data: this.collaborators(true)}} />
      </div>
    )
  },

  renderViewers: function() {
    let _this = this
    return (
      <div>
        <div className='light-grey-bottom-border vertical-padding medium-text'>
          Can view
        </div>

        <SliderToggle
          className='vertical-padding'
          options={{
            true: {
              value: 'hidden',
              title: 'Specific People',
              description: 'This collection will be viewable only to the people you specify.'
            },
            false: {
              value: 'visible',
              title: 'Public',
              description: 'Open it to the public. Every user in Fletcher will be able to view your collection.'
            },
          }}
          active={this.props.unsaved_collection.privacy == 'hidden'}
          onChange={this.props.setPrivacy} />

        <Results
          type='sharee-users'
          className={`sharee ${this.props.unsaved_collection.privacy == 'hidden' ? 'disabled' : ''}`}
          onRemove={this.props.removeUser}
          onUpdate={this.props.updateUser}
          data={{data: this.viewers()}} />
        <Results
          type='sharee-emails'
          className={`sharee ${this.props.unsaved_collection.privacy == 'hidden' ? 'disabled' : ''}`}
          onRemove={this.props.removeEmail}
          onUpdate={this.props.updateEmail}
          data={{data: this.viewers(true)}} />
      </div>
    )
  },

  render: function() {
    return (
      <div>
        <div className='back-button' onClick={this.props.close}>Back</div>
        {this.renderOwnerView()}
        <Footer />
      </div>
    )
  }
});

export default ManageCollaboratorCollectionModalMobile;
