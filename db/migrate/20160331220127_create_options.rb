class CreateOptions < ActiveRecord::Migration
  def change
    create_table :options do |t|
      t.string :text
      t.integer :column_id

      t.timestamps null: false
    end
  end
end
