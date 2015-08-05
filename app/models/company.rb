class Company < ActiveRecord::Base
  has_many :products
  has_many :tags, as: :taggable

  validates :name, presence: true, uniqueness: true

  def image_url
    "http://lorempixel.com/150/150/technics?random=#{id}"
  end

end
