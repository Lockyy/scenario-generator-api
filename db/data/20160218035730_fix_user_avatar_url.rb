class FixUserAvatarUrl < ActiveRecord::Migration
  def self.up
    User.all.each do |user|
      avatar_url = user.avatar_url
      if avatar_url && avatar_url.include?('no_photo')
        user.avatar_url = avatar_url.gsub('/150x150', '')
        user.save
      else
      end
    end
  end

  def self.down
    raise IrreversibleMigration
  end
end
