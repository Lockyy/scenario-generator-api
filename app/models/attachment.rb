class Attachment < ActiveRecord::Base
  @@IMAGE_TYPES = ["image/jpeg", "image/pjpeg", "image/png", "image/x-png", "image/gif"]


  belongs_to :attachable, polymorphic: true
  belongs_to :product

  scope :with_images, -> do
    where(content_type: @@IMAGE_TYPES)
  end

  validates :name, presence: true
  validates :content_type, presence: true
  validates :url, presence: true
  validates :size, presence: true
end
