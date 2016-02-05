class Attachment < ActiveRecord::Base
  @@IMAGE_TYPES = %w(image/jpeg image/pjpeg image/png image/x-png image/gif image/svg+xml)
  @@VALID_TYPES = %w(application/pdf application/vnd.ms-excel application/x-msaccess
                     application/vnd.openxmlformats-officedocument.presentationml.presentation
                     application/vnd.openxmlformats-officedocument.presentationml.slide
                     application/vnd.openxmlformats-officedocument.presentationml.slideshow
                     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                     application/vnd.openxmlformats-officedocument.wordprocessingml.document
                     application/onenote application/vnd.ms-powerpoint
                     application/x-mspublisher application/msword
                     application/x-mswrite application/vnd.ms-works
      ) + @@IMAGE_TYPES

  @@PAPERCLIP_SIZES = {large: '900x900', medium: '294x360', medium_height:'294x135',  thumb: '40x40'}

  belongs_to :attachable, polymorphic: true
  belongs_to :product

  counter_culture [:product, :user], column_name: 'total_attachments'

  scope :with_images, -> do
    where(attachment_content_type: @@IMAGE_TYPES)
  end

  has_attached_file :attachment,
                    styles:      @@PAPERCLIP_SIZES,
                    path:        "uploads/:instance_uuid/:style/:basename.:extension",
                    default_url: '',
                    url:         ':s3_domain_url'

  validates_attachment_content_type :attachment,
                                    content_type: @@VALID_TYPES,
                                    message:      'You are trying to upload an invalid file type'
  validates_attachment_presence :attachment

  before_validation :ensure_attachment_uuid_has_a_value
  before_attachment_post_process :only_process_images

  def only_process_images
    @@IMAGE_TYPES.include? attachment.content_type
  end

  def author
    attachable.user
  end

  def path
    attachment.path
  end

  def file_url(size_type = :original)
    attachment.url(size_type)
  end

  def file_urls
    sizes = @@PAPERCLIP_SIZES.keys
    sizes << :original
    sizes.collect{|key| {type_size: key, url: file_url(key)}}
  end

  private

  def ensure_attachment_uuid_has_a_value
    self.attachment_uuid = SecureRandom.uuid if !attachment_uuid && attachment_file_name
  end
end
