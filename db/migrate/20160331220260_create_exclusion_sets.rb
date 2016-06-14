class CreateExclusionSets < ActiveRecord::Migration
  def change
    create_table :exclusion_sets do |t|
      t.integer :column_id

      t.timestamps null: false
    end
  end
end
