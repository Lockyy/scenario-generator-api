class CreateGenerators < ActiveRecord::Migration
  def change
    create_table :generators do |t|
      t.integer :user_id
      t.integer :subject_id
      t.boolean :spoilers
      t.string :name

      t.timestamps null: false
    end
  end
end
