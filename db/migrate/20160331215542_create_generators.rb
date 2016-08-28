class CreateGenerators < ActiveRecord::Migration
  def change
    create_table :generators do |t|
      t.integer :user_id
      t.boolean :spoilers
      t.string :name
      t.string :ad_link
      t.string :kind
      t.string :slug

      t.timestamps null: false
    end
  end
end
