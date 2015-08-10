class Company < ActiveRecord::Base
  has_many :products
  has_many :tags, as: :taggable

  include HasAvatar

  before_save :downcase_name

  validates :name, presence: true, uniqueness: true

  def image_url
    avatar.try(:url)
  end

  private

  def downcase_name
    self.name = self.name.downcase
  end
end
