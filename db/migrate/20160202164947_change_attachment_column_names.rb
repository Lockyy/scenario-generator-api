class ChangeAttachmentColumnNames < ActiveRecord::Migration
  def change
    rename_column :attachments, :name, :attachment_file_name
    rename_column :attachments, :content_type, :attachment_content_type
    rename_column :attachments, :size, :attachment_file_size
    add_column    :attachments, :attachment_uuid, :string
    remove_column :attachments, :url
  end
end
