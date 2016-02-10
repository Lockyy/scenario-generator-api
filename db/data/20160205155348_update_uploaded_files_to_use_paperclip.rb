class UpdateUploadedFilesToUsePaperclip < ActiveRecord::Migration
  def self.up
    old_attachments = Attachment.all.where.not(url: nil)
    old_attachments.each do |attachment|
      new_attachment_name = attachment.attachment_file_name ||
        "#{attachment.attachable.product.name}_#{attachment.attachable.user.name}_#{attachment.created_at}"

      new_attachment = Attachment.create({
        attachable:           attachment.attachable,
        product:              attachment.product,
        attachment:           open(attachment.url),
        attachment_file_name: new_attachment_name,
        created_at:           attachment.created_at,
        updated_at:           Time.now,
      })
    end

    old_attachments.destroy_all
  end

  def self.down
    raise IrreversibleMigration
  end
end
