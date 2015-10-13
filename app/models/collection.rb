class Collection < ActiveRecord::Base

  enum privacy: [:hidden, :visible]

  belongs_to :user

  has_one :notification, as: :notification_subject
  has_many :collection_products, dependent: :destroy
  has_many :products, through: :collection_products
  has_many :collection_users, dependent: :destroy
  has_many :sharees, through: :collection_users

  validates :title, presence: true
  validates :description, presence: true
  validates :user, presence: true
  validates :privacy, presence: true

  def self.visible(user)
    public_collections = where { (privacy == 1) }
    owned_collections = user.collections
    shared_collections = user.shared_collections

    public_collections + owned_collections + shared_collections
  end

  def self.create_with_params(params, user)
    collection = self.new(user: user)
    collection.update_with_params(params)
  end

  # This will remove any IDs that are not in the user_ids array.
  def share(user_ids)
    user_ids = [] if user_ids == nil

    existing_user_ids = sharees.map(&:id)
    new_ids = user_ids - existing_user_ids
    removed_ids = existing_user_ids - user_ids

    collection_users.where(user_id: removed_ids).destroy_all

    new_ids.each do |id|
      collection_users.create(user_id: id, shared_collection: self)
    end
  end

  def update_with_params(params)
    self.title       = params[:title] if params[:title]
    self.description = params[:description] if params[:description]
    self.privacy     = params[:privacy] if params[:privacy]

    if(params[:products])
      self.products.delete_all
      params[:products].each do |product_id|
        product = Product.find_by(id: product_id)
        self.products.append(product) if product
      end
    end

    self.save
    self
  end

  # A collection is visible if privacy is 'visible' (1)
  # or is owned by the given user
  def visible_to?(user)
    user == self.user || self.visible? || user.shared_collections.where(id: self.id).length > 0
  end

  def name
    title
  end

end