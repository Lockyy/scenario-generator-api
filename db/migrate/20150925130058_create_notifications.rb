class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string  :text
      t.string  :notification_subject_type
      t.integer :notification_subject_id
      t.integer :user_id
      t.integer :sender_id
      t.integer :notification_type
      t.boolean :viewed, default: false

      t.timestamps null: false
    end
  end
end
