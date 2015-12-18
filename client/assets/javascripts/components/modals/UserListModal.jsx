import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxModalActions from '../../actions/FluxModalActions';
import Avatar from '../Avatar';
import Footer from '../Footer';

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const UserListMixin = {
  renderUserListModal: function() {
    return (
      <UserListModal
        ref='UserListModal'
        close={this.closeUserListModal} />
    )
  },

  closeUserListModal: function() {
    FluxModalActions.closeModal();
  },

  showUserListModal: function(users) {
    FluxModalActions.setVisibleModal('UserListModal', 0, {users: users});
  }
};

const UserListModal = React.createClass ({
  displayName: 'UserListModal',

  mixins: [ Navigation ],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      users: [],
      title: 'Users'
    }
  },

  // Flux Methods
  ///////////////

  componentDidMount: function() {
    ModalStore.listen(this.onChangeModal);
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({
      visible: visible,
      users: data.config.users,
      title: data.config.title || this.state.title
    });
  },

  // onClicks
  ///////////

  onClickUser: function(e) {
    this.props.close();
    this.transitionTo(`/app/users/${e.target.dataset.userId}`);
  },

  // Rendering
  ////////////

  renderUsers: function() {
    return (
      <div className='users-list'>
        {_.map(this.state.users, function(user) {
          return (
            <div className='user grey-bottom-border last-no-border vertical-padding flex-vertical-centering'>
              <Avatar user={user} />
              <span
                data-user-id={user.id}
                onClick={this.onClickUser}
                className='link black'>
                { user.name }
              </span>
            </div>
          )
        }.bind(this))}
      </div>
    )
  },

  renderheader: function() {
    return (
      <div className='header hidden-xs'>
        <span className='title'>
          {this.state.title}
        </span>
        <a onClick={this.close} className='close'></a>
      </div>
    )
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.props.close}
        style={DefaultModalStyles}>

        <div className='back-button' onClick={this.props.close}>
          Back
        </div>

        {this.renderheader()}
        {this.renderUsers()}

        <Footer className='visible-xs' />
      </Modal>
    )
  }
});

module.exports = {
  UserListMixin: UserListMixin,
  UserListModal: UserListModal
};
