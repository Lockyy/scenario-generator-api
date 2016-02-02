module Avatarable
  extend ActiveSupport::Concern
  included do
    has_attached_file :avatar, :styles => { :large => "900x900", :medium => "300x300>", :thumb => "100x100>" },
                      :path => "uploads/:instance_uuid/:style/:basename.:extension",
                      :default_url => "", :url => ":s3_domain_url"

    before_validation :ensure_avatar_uuid_has_a_value

    validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

    private
    def ensure_avatar_uuid_has_a_value
      self.avatar_uuid = SecureRandom.uuid if !self.avatar_uuid && self.avatar_file_name
    end
  end
end