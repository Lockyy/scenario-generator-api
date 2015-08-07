module HasAvatar
  extend ActiveSupport::Concern
  included do
    before_validation :ensure_avatar_uuid_has_a_value

    has_attached_file :avatar, :styles => { :large => "900x900", :medium => "300x300>", :thumb => "100x100>" },
                      :path => "uploads/:instance_uuid/:style/:instance_uuid:basename.:extension"
    validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

    def ensure_avatar_uuid_has_a_value
      self.avatar_uuid = "%s%s" % [SecureRandom.uuid, self.avatar_file_size] if !self.avatar_uuid && self.avatar_file_size
    end
  end

end