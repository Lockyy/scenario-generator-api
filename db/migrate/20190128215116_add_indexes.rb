class AddIndexes < ActiveRecord::Migration[5.2]
  def change
    add_index :column_parents, :column_id
    add_index :column_parents, [:parent_type, :parent_id]

    add_index :columns, :generator_id

    add_index :exclusion_sets, :column_id

    add_index :generators, :name
    add_index :generators, :user_id

    add_index :option_exclusions, :exclusion_set_id
    add_index :option_exclusions, :option_id

    add_index :options, :column_id

    add_index :scenarios, :uuid
    add_index :scenarios, :generator_id
  end
end
