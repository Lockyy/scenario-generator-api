class Company < ActiveRecord::Base
  has_many :products
  has_many :tags, as: :taggable

  include Avatarable

  before_save :downcase_name

  validates :name, presence: true, uniqueness: true

  def image_url
    avatar.try(:url)
  end

  def short_desc
    description.split[0...10].join(' ') if description
  end

  private

  def downcase_name
    self.name = self.name.downcase
  end
end
