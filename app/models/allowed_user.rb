class AllowedUser < ActiveRecord::Base
  before_save :downcase_email

  def self.whitelisted?(email)
    return true unless ENV['ENABLE_WHITELIST']
    !find_by(email: email).nil?
  end

  def downcase_email
    self.email = email.downcase
  end
end
