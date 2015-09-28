class Collection < ActiveRecord::Base

  enum privacy: [:hidden, :visible]

  belongs_to :user
  has_many :collection_products, dependent: :destroy
  has_many :products, through: :collection_products

  validates :title, presence: true
  validates :description, presence: true
  validates :user, presence: true
  validates :privacy, presence: true

  def self.visible(user)
    where { (user_id == user.id) | (privacy == 1) }
  end

  def self.create_with_params(params, user)
    collection = self.new(user: user)
    collection.update_with_params(params)
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
    user == self.user || self.visible?
  end

end
