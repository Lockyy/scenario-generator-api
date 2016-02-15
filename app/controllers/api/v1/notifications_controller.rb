class Api::V1::NotificationsController < AppController
  def index
    @notification_ids = current_user.notifications.unviewed.map(&:id)
    @notifications = Notification.where(id: @notification_ids)

    Notification.mark_viewed(@notification_ids)

    respond_to do |format|
      format.json { render }
    end
  end
end
