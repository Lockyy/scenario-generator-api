gem 'faker'

class Product < ActiveRecord::Base
  belongs_to :company
  has_many :reviews, as: :reviewable

  # TODO: REMOVE LIMIT AND OFFSET
  scope :recently_added, ->(params = {}) do
    params = {max: 10, offset: 0}.merge(params || {}).with_indifferent_access
    order('created_at desc').limit(params[:max]).offset(params[:offset])
  end

  # TODO: REMOVE LIMIT AND OFFSET
  scope :most_popular, ->(params = {}) do
    params = {max: 2, offset: 0}.merge(params || {}).with_indifferent_access
    # TODO:
    # order('number_of_views').limit(params[:max]).offset(params[:offset])
    limit(params[:max]).offset(params[:offset])
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

  def number_of_views
    Faker::Number.between(0, 99999999)
  end
end
