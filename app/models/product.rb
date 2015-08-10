gem 'faker'

class Product < ActiveRecord::Base
  belongs_to :company
  has_many :reviews, as: :reviewable
  has_many :images, -> { with_images }, through: :reviews, source: :attachments
  has_many :tags, through: :reviews
  has_one :default_image, class_name: 'Attachment'

  before_save :downcase_name

  validates :name, presence: true, uniqueness: { scope: :company_id }
  validates :description, presence: true
  validates :company, presence: true

  scope :recently_added, -> do
    order('created_at desc')
  end

  scope :most_popular, -> do
    order('views desc')
  end

  def image
    image = default_image || images.first
    image.try(:url)
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

  def increment_views!
    self.views = self.views + 1
    self.save
  end

  private

  def downcase_name
    self.name = self.name.downcase
  end
end
