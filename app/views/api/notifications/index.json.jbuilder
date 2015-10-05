json.total @notifications.size

json.notifications  @notifications.first(5),
                    partial: 'api/notifications/notification',
                    as: :notification