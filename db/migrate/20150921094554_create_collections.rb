class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.integer :user_id
      t.string :title
      t.string :description
      t.integer :privacy, default: 0

      t.timestamps null: false
    end
  end
end
