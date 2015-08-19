gem 'faker'

class Product < ActiveRecord::Base
  include PgSearch

  belongs_to :company
  has_many :reviews, as: :reviewable
  has_many :images, -> { with_images }, through: :reviews, source: :attachments
  has_many :links, through: :reviews
  has_many :tag_taggables, as: :taggable
  has_many :tags, through: :tag_taggables
  has_one :default_image, class_name: 'Attachment'

  before_save :downcase_name

  accepts_nested_attributes_for :reviews

  validates :name, presence: true, uniqueness: {scope: :company_id}
  validates :description, presence: true
  validates :company, presence: true

  scope :recently_added, -> do
    order('created_at desc')
  end

  scope :most_popular, -> do
    order('views desc')
  end

  pg_search_scope :search_by_name_and_description, :against => [
                                                     [:name, 'A'],
                                                     [:description, 'B']
                                                 ], :using => {
                                                     :tsearch => {:any_word => true, :prefix => true},
                                                     :dmetaphone => {:any_word => true, :sort_only => true}
                                                 }

  pg_search_scope :search_by_name, :against => :name, :using => {
                                     :tsearch => {:any_word => true, :prefix => true},
                                     :dmetaphone => {:any_word => true, :sort_only => true}
                                 }

  pg_search_scope :search_by_description, :against => :description, :using => {
                                     :tsearch => {:any_word => true, :prefix => true},
                                     :dmetaphone => {:any_word => true, :sort_only => true}
                                 }

  scope :rating, -> rating_order do
    joins('LEFT JOIN reviews rev ON products.id = rev.reviewable_id')
        .select('sum(COALESCE(rev.quality_score, 0)) as total_quality_score, products.id, products.name, products.description,
products.url, company_id, products.views, products.created_at, products.updated_at')
        .group('products.id, products.name, products.description,
products.url, company_id, products.views, products.created_at, products.updated_at')
        .order("total_quality_score #{rating_order}")
  end

  scope :best_rating, -> do
    rating('desc')
  end

  scope :worst_rating, -> do
    rating('asc')
  end

  def image
    image = default_image || images.first
    image.try(:url)
  end

  def total_reviews
    reviews.size
  end

  def rating
    self.reviews.map(&:quality_score).compact.average || 0
  end

  def price
    self.reviews.map(&:price_score).compact.average || 0
  end

  def author
    Faker::Name.name
  end

  def short_desc
    description.split[0...9].join(' ') if description
  end

  def increment_views!
    self.views = self.views + 1
    self.save
  end

  private

  def downcase_name
    self.name = self.name.downcase
  end
end
