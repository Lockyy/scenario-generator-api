import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import CollectionBox from './CollectionBox';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
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
    $('body').removeClass('no-scroll');
    this.setState({showCollectionShareModal: false})
    if(!(this.props.route && this.props.route.name == "CollectionPage")) {
      FluxCollectionActions.clearCollection();
    }
  },

  showCollectionShareModal: function(collection) {
    $(window).scrollTop(0);
    $('body').addClass('no-scroll');
    FluxCollectionActions.fetchedCollection(collection);
    this.setState({showCollectionShareModal: true});
  },

  onShareCollection: function(data, resolve) {
    FluxCollectionActions.shareCollection(data.id, data.users, resolve)
  }
};

const CollectionShareModal = React.createClass ({
  displayName: 'CollectionShareModal',

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

  componentDidMount: function() {
    CollectionStore.listen(this.onChange);
  },

  onChange: function(collection) {
    this.setState(collection)
  },

  close: function() {
    this.props.close()
  },

  onFocus: function(e) {
    $(React.findDOMNode(this.refs.fields_container)).addClass('focus')
  },

  onBlur: function(e) {
    $(React.findDOMNode(this.refs.fields_container)).removeClass('focus')
  },

  getUserIDs: function() {
    return _.map(this.state.data.collection.users, function(user) {
      return user.id
    })
  },

  updateUsers: function(users, user_name) {
    let collection = this.state.data.collection
    collection.users = users
    this.setState({ user_name: user_name, data: { collection: collection }})
  },

  removeUser: function(user_id) {
    let users = this.state.data.collection.users.filter(function(user) {
      return user.id !== user_id;
    });

    this.updateUsers(users, null);
  },

  addUser: function(user, selected) {
    if(selected) {
      let newUsers = this.state.data.collection.users
      newUsers.push(user)
      this.updateUsers(newUsers, null);
    } else {
      this.setState({user_name: user.name})
    }
  },

  submitForm: function(e) {
    e.preventDefault()
    let _this = this

    let data = {
      id: this.state.data.collection.id,
      title: this.state.data.collection.title,
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

  render: function() {
    return (
      <Modal
        isOpen={this.props.visible}>
        <div className='back-button' onClick={this.close}>{"< Close"}</div>
        <div className='header'>
          <span className='title'>
            Share {this.state.data.collection.title} with others
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
