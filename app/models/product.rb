gem 'faker'

class Product < ActiveRecord::Base
  belongs_to :company
  has_many :reviews, as: :reviewable

  scope :recently_added, ->(params = {}) do
    params = {max: 10, offset: 0}.merge(params || {}).with_indifferent_access
    order('created_at desc').limit(params[:max]).offset(params[:offset])
  end

  def image
    "http://lorempixel.com/960/540/technics?random=#{id}"
  end

  def rating
    Faker::Number.between(0, 5)
  end

  def author
    Faker::Name.name
  end
end
