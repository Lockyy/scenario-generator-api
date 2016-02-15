class Notification < ActiveRecord::Base
  belongs_to :user
  belongs_to :sender, class_name: 'User'

  belongs_to :notification_subject, polymorphic: true

  enum notification_type: [:share, :updated_permissions, :deleted]

  default_scope -> { order('created_at ASC') }

  scope :viewed,   -> { where(viewed: true) }
  scope :unviewed, -> { where(viewed: false) }

  def self.mark_viewed(ids)
    notifications = where(id: ids)
    notifications.each do |notification|
      notification.update_attributes(viewed: true)
    end
  end
end
