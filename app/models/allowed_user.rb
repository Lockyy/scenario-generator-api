class AllowedUser < ActiveRecord::Base

  before_save :downcase_email

  def self.whitelisted? email
    return true unless ENV['ENABLE_WHITELIST']
    !self.find_by(email: email).nil?
  end

  def downcase_email
    self.email = self.email.downcase
  end
end
