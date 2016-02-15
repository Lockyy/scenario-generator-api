class CollectionUser < ActiveRecord::Base
  belongs_to :shared_collection, class_name: 'Collection', foreign_key: 'collection_id', touch: true
  belongs_to :sharee, class_name: 'User', foreign_key: 'sharee_id'

  after_create :create_notification
  after_update :updated_notification
  after_create :send_email
  after_destroy :destroyed_notification

  validates_uniqueness_of :sharee_id, scope:  :collection_id,
                                      unless: proc { |a| a.sharee_id.blank? }
  validates_uniqueness_of :email, scope:  :collection_id,
                                  unless: proc { |a| a.email.blank? }

  validates_presence_of :shared_collection

  validates_format_of :email, with:      /\A\S+@{1}(am\.|eu\.|ap\.)?jll\.com\z/,
                              allow_nil: true,
                              message:   'is not a valid JLL email'

  scope :invites, -> { where.not(email: nil) }
  scope :with_registered_user, -> { where.not(sharee_id: nil) }

  enum rank: [:viewer, :collaborator, :owner]

  def create_notification
    Notification.create(sender:               shared_collection.user,
                        user:                 sharee,
                        notification_type:    'share',
                        notification_subject: shared_collection)
  end

  def updated_notification
    return unless rank_changed?
    Notification.create(sender:               shared_collection.user,
                        user:                 sharee,
                        notification_type:    'updated_permissions',
                        text:                 "Your access level in #{shared_collection.name} has been changed to #{rank}",
                        notification_subject: shared_collection)
  end

  def destroyed_notification
    Notification.create(sender:               shared_collection.user,
                        user:                 sharee,
                        notification_type:    'deleted',
                        text:                 "Your access to #{shared_collection.name} has been removed",
                        notification_subject: shared_collection)
  end

  def send_email
    return unless shared_collection.send_email_invites
    if email
      ShareMailer.invitation(shared_collection.user, email, shared_collection).deliver_now
    else
      ShareMailer.share(shared_collection.user, sharee, shared_collection).deliver_now
    end
  end
end
