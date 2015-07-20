gem 'faker'

class Product < ActiveRecord::Base
  belongs_to :company
  has_many :reviews, as: :reviewable

  def image
    "http://lorempixel.com/960/540/technics?random=#{Faker::Number.number(10)}"
  end

  def rating
    Faker::Number.between(0, 5)
  end

  def author
    Faker::Name.name
  end
end
