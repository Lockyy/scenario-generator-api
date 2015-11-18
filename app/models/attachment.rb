class Attachment < ActiveRecord::Base
  @@IMAGE_TYPES = ["image/jpeg", "image/pjpeg", "image/png", "image/x-png", "image/gif", "image/svg+xml"]

  belongs_to :attachable, polymorphic: true
  belongs_to :product
  counter_culture [:product, :user], :column_name => "total_attachments"

  scope :with_images, -> do
    where(content_type: @@IMAGE_TYPES)
  end

  validates :name, presence: true
  validates :content_type, presence: true
  validates :url, presence: true
  validates :size, presence: true
  validates :content_type, inclusion: {
    in: [
      "image/jpeg", "image/pjpeg", "image/png", "image/x-png",
      "image/gif", "image/svg+xml", "application/pdf",
      "application/vnd.ms-excel", "application/x-msaccess",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.presentationml.slide",
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/onenote", "application/vnd.ms-powerpoint",
      "application/x-mspublisher", "application/msword",
      "application/x-mswrite", "application/vnd.ms-works"
    ],
    message: "%{value} is not a valid attachment type"
  }

  def author
    attachable.user
  end
end
