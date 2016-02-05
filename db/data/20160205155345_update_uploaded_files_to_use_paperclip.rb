class UpdateUploadedFilesToUsePaperclip < ActiveRecord::Migration
  def self.up
    Attachment.all.each do |att|
      att.attachment = URI.parse(att.url)
      att.save
    end
  end

  def self.down
    raise IrreversibleMigration
  end
end
