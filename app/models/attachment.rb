class Attachment < ActiveRecord::Base
  belongs_to :attachable, polymorphic: true

  validates :name, presence: true
  validates :content_type, presence: true
  validates :url, presence: true
  validates :size, presence: true
end
