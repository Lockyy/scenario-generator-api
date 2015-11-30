class CollectionUser < ActiveRecord::Base

  belongs_to :shared_collection, class_name: 'Collection', foreign_key: 'collection_id'
  belongs_to :sharee, class_name: 'User', foreign_key: 'sharee_id'

  after_create :create_notification
  after_create :send_email

  validates_uniqueness_of :sharee_id, :scope => :collection_id,
    unless: Proc.new { |a| a.sharee_id.blank? }
  validates_uniqueness_of :email, :scope => :collection_id,
    unless: Proc.new { |a| a.email.blank? }

  scope :invites, -> { where.not(email: nil) }
  scope :with_registered_user, -> { where.not(sharee_id: nil) }

  enum rank: [:viewer, :collaborator, :owner]

  def create_notification
    Notification.create(sender: shared_collection.user,
                        user: sharee,
                        notification_type: 'share',
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
