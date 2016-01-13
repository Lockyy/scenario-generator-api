import alt from '../FluxAlt';
import _ from 'lodash';
import NotificationsAPI from '../utils/api/NotificationsAPI';

class FluxNotificationsActions {

  fetchNotifications() {
    NotificationsAPI.fetchNotifications(
      (data) => {
        this.actions.updateData(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  showNotification(notification) {
    this.actions.updateData({
      notifications: [
        {
          type:    notification.type,
          text:    notification.text,
          link:    notification.link,
          subject: notification.subject,
          action:  notification.action,
          id: _.random(-100000000, -1)
        }
      ]
    })
  }

  removeNotification(id) {
    this.dispatch(id)
  }

  updateData(data) {
    this.dispatch(data);
  }

  registerError(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(FluxNotificationsActions);
