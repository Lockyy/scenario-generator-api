module Api
  class NotificationsController < AppController

    def index
      @notification_ids = current_user.notifications.unviewed.map(&:id)
      @notifications = Notification.where(id: @notification_ids)

      Thread.start do
        Notification.mark_viewed(@notification_ids)
        if (ActiveRecord::Base.connection && ActiveRecord::Base.connection.active?)
           ActiveRecord::Base.connection.close
        end
      end

      respond_to do |format|
        format.json { render }
      end

    end

  end
end
