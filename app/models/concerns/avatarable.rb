module Avatarable
  @@PAPERCLIP_SIZES = { large: '900x900', medium: '294x360', medium_height: '294x135', thumb: '40x40' }

  extend ActiveSupport::Concern
  included do
    has_attached_file :avatar, styles:      @@PAPERCLIP_SIZES,
                               path:        'uploads/:instance_uuid/:style/:basename.:extension',
                               default_url: '',
                               url:         ':s3_domain_url'

    before_validation :ensure_avatar_uuid_has_a_value

    validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

    private

    def ensure_avatar_uuid_has_a_value
      self.avatar_uuid = SecureRandom.uuid if !avatar_uuid && avatar_file_name
    end
  end
end
