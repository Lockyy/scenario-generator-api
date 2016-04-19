class CreateOptionExclusions < ActiveRecord::Migration
  def change
    create_table :option_exclusions do |t|
      t.integer :left_option_id
      t.integer :right_option_id

      t.timestamps null: false
    end
  end
end
