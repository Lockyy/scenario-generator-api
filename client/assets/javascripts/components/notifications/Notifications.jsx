import                        _ from 'lodash'
import                    React from 'react'
import                  timeago from 'timeago'
import     { Link, Navigation } from 'react-router'
import       NotificationSystem from 'react-notification-system';
import       NotificationsStore from '../../stores/NotificationsStore'
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import       NotificationStyles from './NotificationStyles'


const Notifications = React.createClass({
  displayName: 'Notifications',
  mixins: [ Navigation ],

  _notificationSystem: null,

  NOTIFICATION_FETCH_TIMEOUT: 20000,

  getInitialState: function() {
    return {
      data: {
        notifications: []
      }
    };
  },

  componentDidMount: function() {
    NotificationsStore.listen(this.onChange.bind(this));
    FluxNotificationsActions.fetchNotifications();
    this._notificationSystem = this.refs.notificationSystem;

    setInterval(  FluxNotificationsActions.fetchNotifications,
                  this.NOTIFICATION_FETCH_TIMEOUT);
  },

  removeNotification: function(notification) {
    FluxNotificationsActions.removeNotification(notification.uid)
  },

  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  getAction: function(notification) {
    if(notification.subject && notification.type !== 'delete' && notification.show_button !== false) {
      let label, action, link;
      let _this = this;

      label = this.capitalize(notification.subject.name)

      switch(notification.subject.type) {
        case 'Product':
          link = `/app/products/${notification.subject.id}`
          break;
        case 'Collection':
          link = `/app/collections/${notification.subject.id}`
          break;
      }

      if(label && link) {
        return {
          label: label,
          callback: function() {
            _this.props.router.transitionTo(link);
          }
        }
      }
    }
  },

  getMessage: function(notification) {
    if(notification.text) {
      return notification.text
    }

    switch(notification.type) {
      case 'share':
        return `${notification.sender.name} has shared a ${notification.subject.type} with you`
        break;
      case 'sent-share':
        return `You have shared ${notification.subject.name}`
        break;
      case 'review':
        return `Your review for ${notification.subject.name} has been saved`
        break;
      case 'collection':
        return `Your collection has been saved`
        break;
      case 'delete':
        return `You have deleted the ${notification.subject.type} ${notification.subject.name}`
        break;
      case 'leave-collection':
        return `You have left the collection ${notification.subject.name}`
        break;
    }
  },

  autoDismiss: function(notification) {
    return notification.type === 'share' ? 0 : 3
  },

  onChange: function(data) {
    this.setState(data);

    let _this = this
    _.map(this.state.data.notifications, function(notification) {
      _this._notificationSystem.addNotification({
        message: _this.getMessage(notification),
        action: _this.getAction(notification),
        level: 'info',
        uid: notification.id,
        autoDismiss: _this.autoDismiss(notification),
        onRemove: _this.removeNotification,
      })
    })
  },

  render: function() {
    return <NotificationSystem
              style={NotificationStyles}
              ref="notificationSystem" />
  }
})

export default Notifications;
