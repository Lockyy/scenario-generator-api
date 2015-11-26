class Collection < ActiveRecord::Base

  enum privacy: [:hidden, :visible]

  belongs_to :user

  has_one :notification, as: :notification_subject
  has_many :collection_products, dependent: :destroy
  has_many :products, through: :collection_products
  has_many :collection_users, dependent: :destroy
  has_many :sharees, through: :collection_users
  has_many :tags, through: :products

  validates :title, presence: true
  validates :description, presence: true
  validates :user, presence: true
  validates :privacy, presence: true

  scope :visible, -> (user) {
    joins{collection_users.outer}.
          where{(user_id.eq user.id) |
                (collection_users.sharee.eq user) |
                (privacy.eq 1)}
  }

  scope :editable, -> (user) {
    joins{collection_users.outer}.
          where{(user_id.eq user.id) |
                (collection_users.sharee.eq(user) & collection_users.rank.gteq(1))}
  }

  scope :owned, -> (user) {
    joins{collection_users.outer}.
          where{(user_id.eq user.id) |
                (collection_users.sharee.eq(user) & collection_users.rank.gteq(2))}
  }

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

  # This will remove any IDs that are not in the sharee_ids array.
  def share(new_sharees)
    new_sharees = [] if new_sharees == nil
    # Remove any sharees not passed in from the front end
    sharee_ids = new_sharees.map { |sharee| sharee.with_indifferent_access['id'].to_i }
    existing_sharee_ids = sharees.map(&:id)
    self.remove_sharees(existing_sharee_ids - sharee_ids)

    # Create new sharees or update existing ones with new info.
    new_sharees.each do |sharee_hash|
      sharee_hash = sharee_hash.with_indifferent_access
      sharee = self.collection_users.find_or_create_by(sharee_id: sharee_hash['id']) do |collection_user|
        collection_user.rank = sharee_hash['rank']
      end
    end
  end

  def add_product(product_id)
    product = Product.find_by(id: product_id)
    self.products.append(product) if product
  end

  def name
    title
  end

  def display_date
    created_at.strftime('%b %e, %Y')
  end

end
