import alt from '../FluxAlt';
import FluxNotificationsActions from '../actions/FluxNotificationsActions'

class NotificationsStore {
  constructor() {
    this.resetDefaultState();

    this.bindListeners({
      handleUpdateData: FluxNotificationsActions.UPDATE_DATA,
      handleRemoveNotification: FluxNotificationsActions.REMOVE_NOTIFICATION
    });
  }

  handleUpdateData(data) {
    let notifications

    if(this.data) {
      notifications = _.unique( this.data.notifications.concat(data.notifications),
                                function(obj) {  return obj.id; });
    } else {
      notifications = data.notifications
    }

    this.data = {
      notifications: notifications
    }
  }

  handleRemoveNotification(id) {
    let notifications = _.reject( this.data.notifications,
                                  function(not) { return not.id == id; });

    this.data = {
      notifications: notifications
    }
  }

  handleRegisterError(error) {
    this.error = error;
  }

  resetDefaultState() {
    this.data = null;
  }
}

module.exports = alt.createStore(NotificationsStore, 'NotificationsStore');
