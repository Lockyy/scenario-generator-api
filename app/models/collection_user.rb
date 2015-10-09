class CollectionUser < ActiveRecord::Base

  belongs_to :shared_collection, class_name: 'Collection', foreign_key: 'collection_id'
  belongs_to :sharee, class_name: 'User', foreign_key: 'user_id'

  after_create :create_notification

  def create_notification
    Notification.create(sender: sharee,
                        user_id: shared_collection.user,
                        notification_type: 'share',
                        notification_subject: shared_collection)
  end

end
