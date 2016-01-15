class Collection < ActiveRecord::Base
  include SearchableByNameAndDescription

  enum privacy: [:hidden, :visible]

  belongs_to :user

  has_one :notification, as: :notification_subject
  has_many :collection_products, dependent: :destroy
  has_many :products, through: :collection_products
  has_many :collection_users, -> { where(email: nil) }, dependent: :destroy
  has_many :sharees, through: :collection_users
  has_many :invited_sharees, -> { where.not(email: nil) }, class_name: 'CollectionUser'
  has_many :tags, through: :products

  validates :name, presence: true
  validates :description, presence: true
  validates :user, presence: true
  validates :privacy, presence: true

  before_save :capitalize_name

  scope :latest, -> { order(created_at: :desc) }

  scope :visible, -> (user) {
    joins{collection_users.outer}.
          where{(user_id.eq user.id) |
                (collection_users.sharee.eq user) |
                (privacy.eq 1)}.uniq
  }

  scope :editable, -> (user) {
    joins{collection_users.outer}.
          where{(user_id.eq user.id) |
                (collection_users.sharee.eq(user) & collection_users.rank.gteq(1))}.uniq
  }

  scope :owned, -> (user) {
    joins{collection_users.outer}.
          where{(user_id.eq user.id) |
                (collection_users.sharee.eq(user) & collection_users.rank.gteq(2))}.uniq
  }

  scope :alphabetical, -> do
    order('name asc')
  end

  scope :recently_added, -> do
    order('created_at desc')
  end

  scope :with_tags, ->(tags_names) do
    joins(:tags).where('tags.name in (?)', tags_names).uniq
  end

  def capitalize_name
    self.name = self.name.slice(0,1).capitalize + self.name.slice(1..-1)
  end

  def visible_to?(user)
    Collection.where(id: id).visible(user).length > 0
  end

  def editable_by?(user)
    Collection.where(id: id).editable(user).length > 0
  end

  def owned_by?(user)
    Collection.where(id: id).owned(user).length > 0
  end

  def remove_sharees(ids)
    collection_users.where(sharee_id: ids).destroy_all
  end

  def remove_invitations(emails)
    invited_sharees.where(email: emails).destroy_all
  end

  def share_and_invite(users, emails)
    self.share(users) && self.invite(emails)
  end

  # This will remove any IDs that are not in the new_sharees array.
  def share(new_sharees)
    new_sharees = [] if new_sharees == nil
    # Remove any sharees not passed in from the front end
    sharee_ids = new_sharees.map { |sharee| sharee.with_indifferent_access['id'].to_i }
    existing_sharee_ids = sharees.map(&:id)
    self.remove_sharees(existing_sharee_ids - sharee_ids)

    # Create new sharees or update existing ones with new info.
    new_sharees.each do |sharee_hash|
      sharee_hash = sharee_hash.with_indifferent_access
      sharee = self.collection_users.find_or_initialize_by(sharee_id: sharee_hash['id'])
      sharee.rank = sharee_hash['rank']
      sharee.save
    end
  end

  # This will remove any emails that are not in the new_invitations array
  def invite(new_invitations)
    new_invitations = [] if new_invitations == nil

    emails = new_invitations.map { |sharee| sharee.with_indifferent_access['email'] }
    existing_invitations = invited_sharees.map(&:email)
    self.remove_invitations(existing_invitations - emails)

    # Create new invitations or update existing ones with new info.
    new_invitations.each do |invitation_hash|
      invitation_hash = invitation_hash.with_indifferent_access
      sharee = self.invited_sharees.find_or_initialize_by(email: invitation_hash['email'])
      sharee.rank = invitation_hash['rank']
      sharee.save
    end
  end

  def update_products(products, user)
    new_products = products - self.products
    self.update_attributes(products: products)
    new_collection_products = self.collection_products.where(product: new_products)
    new_collection_products.update_all(user_id: user.id)
  end

  def display_date
    updated_at.strftime('%b %e, %Y')
  end

end
