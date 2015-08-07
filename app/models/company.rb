class Company < ActiveRecord::Base
  has_many :products
  has_many :tags, as: :taggable

  include HasAvatar

  validates :name, presence: true, uniqueness: true
end
