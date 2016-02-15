gem 'faker'

class Product < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: [:slugged, :history], dependent: false

  begin
    make_exportable only: [
      :name, :url, :company,
      :rating, :price,
      :total_reviews
    ]
  rescue
    puts "make_exportable in product.rb was unable to set up. If you are precompiling in the Dockerfile this is fine, the database isn't loaded and we just need to handle this error. If not, something has gone wrong."
  end

  belongs_to :company
  belongs_to :user
  counter_culture :user, column_name: 'total_products'

  has_one :notification, as: :notification_subject
  has_many :reviews, dependent: :destroy
  has_many :custom_attachments, as: :attachable, source: :attachments, class_name: 'Attachment'
  has_many :attachments, through: :reviews, source: :attachments
  has_many :reviews_images, -> { with_images }, through: :reviews, source: :attachments
  has_many :links, through: :reviews
  has_many :tags, through: :reviews
  has_many :related_products, through: :tags, source: :products
  has_many :bookmarks, dependent: :destroy
  has_many :collection_products, dependent: :destroy
  has_many :collections, through: :collection_products

  has_one :default_image, class_name: 'Attachment'

  include SearchableByNameAndDescription
  include SearchableByTag

  accepts_nested_attributes_for :reviews
  accepts_nested_attributes_for :custom_attachments

  default_scope { includes(:reviews) }

  validates :name, presence: true, uniqueness: { scope: :company_id, case_sensitive: false }
  validates :description, presence: true
  validates :company, presence: true

  before_save :cache_scores

  scope :alphabetical, -> do
    order('name asc')
  end

  scope :recently_added, -> do
    order('created_at desc')
  end

  scope :most_popular, -> do
    order('views desc')
  end

  scope :with_author, ->(author) do
    where(user: author)
  end

  scope :with_tags, ->(tags_names) do
    joins(:tags).where('tags.name in (?)', tags_names).uniq
  end

  scope :rating, -> (rating_order) do
    joins('LEFT JOIN reviews rev ON products.id = rev.product_id')
      .select('sum(COALESCE(rev.quality_score, 0)) / GREATEST(count(rev.quality_score), 1) as total_quality_score, products.id, products.name, products.description,
products.url, company_id, products.views, products.created_at, products.updated_at, products.slug')
      .group('products.id, products.name, products.description,
products.url, company_id, products.views, products.created_at, products.updated_at, products.slug')
      .order("total_quality_score #{rating_order}")
  end

  scope :best_rating, -> do
    rating('desc')
  end

  scope :worst_rating, -> do
    rating('asc')
  end

  def company_export
    company.name
  end

  def self.deleted?(id)
    return  find_by(id: id).nil? &&
            !FriendlyIDSlug.find_by(sluggable_id: id, sluggable_type: 'Product').nil? if id.to_i > 0
    slug = FriendlyIDSlug.find_by(slug: id)
    find_by(slug: id).nil? && !slug.nil? && slug.sluggable.nil?
  end

  # Returns any tags for this product that are followed by the given user
  def user_tags(user)
    user_tag_ids = user.tags.map(&:id)
    tags.where(id: user_tag_ids)
  end

  def bookmark(user)
    bookmarks.first_or_create(user: user)
  end

  def unbookmark(user)
    bookmark = bookmarks.find_by(user: user)
    bookmark.destroy if bookmark
  end

  def bookmarked?(user)
    bookmarks.find_by(user: user) ? true : false
  end

  def images
    custom_attachments.with_images + reviews_images
  end

  def image
    image = default_image || images.first
    image.try(:file_urls)
  end

  def cache_scores
    average_quality = reviews.map(&:quality_score).compact.average
    average_price = reviews.map(&:price_score).compact.average
    self.quality_score_cache = average_quality.nan? ? 0 : average_quality
    self.price_score_cache = average_price.nan? ? 0 : average_price
  end

  def rating
    quality_score_cache
  end

  def price
    price_score_cache
  end

  def author
    user
  end

  def short_desc
    description.split[0...9].join(' ') if description
  end

  def reviewed_by_user?(user)
    reviews.where(user: user).size > 0
  end

  def should_generate_new_friendly_id?
    true
  end

  def related(quantity)
    related_products.where.not(id: id).uniq.sample(quantity)
  end
end
