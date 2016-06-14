class CreateOptionExclusions < ActiveRecord::Migration
  def change
    create_table :option_exclusions do |t|
      t.integer :option_id
      t.integer :exclusion_set_id

      t.timestamps null: false
    end
  end
end
