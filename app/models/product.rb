gem 'faker'

class Product < ActiveRecord::Base
  belongs_to :company
  has_many :reviews, as: :reviewable

  scope :recently_added, -> do
    order('created_at desc')
  end

  scope :most_popular, -> do
    # TODO:
    # order('views').limit(params[:max]).offset(params[:offset])
    all
  end

  def image
    Faker::Number.between(0, 5).odd? ? "http://lorempixel.com/960/540/technics?random=#{id}" : nil
  end

  def rating
    Faker::Number.between(0, 5)
  end

  def author
    Faker::Name.name
  end

  def increment_views!
    self.views = self.views + 1
    self.save
  end

  validates :name, presence: true, uniqueness: { scope: :company_id }
  validates :description, presence: true
  validates :company, presence: true
end
