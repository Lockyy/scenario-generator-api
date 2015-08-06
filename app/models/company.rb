class Company < ActiveRecord::Base
  has_many :products
  has_many :tags, as: :taggable
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }

  validates :name, presence: true, uniqueness: true
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

end
