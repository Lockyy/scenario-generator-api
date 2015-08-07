class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.references :attachable, polymorphic: true, index: true
      t.string :url
      t.string :name
      t.string :content_type
      t.integer :size

      t.timestamps null: false
    end
  end
end
