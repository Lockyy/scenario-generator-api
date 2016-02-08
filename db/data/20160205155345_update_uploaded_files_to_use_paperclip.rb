class UpdateUploadedFilesToUsePaperclip < ActiveRecord::Migration
  def self.up
    Attachment.all.each do |att|
      att.attachment_uuid = att.url[/(?<=uploads\/)(.*?)(?=\/)/]
      att.save
    end
  end

  def self.down
    raise IrreversibleMigration
  end
end
