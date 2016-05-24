class CreateColumns < ActiveRecord::Migration
  def change
    create_table :columns do |t|
      t.string  :name
      t.integer :generator_id
      t.integer :parent_id
      t.string  :parent_type
      t.boolean :spoilers, default: :false
      t.integer :min, default: 1
      t.integer :max, default: 1
      t.integer :max_per
      t.string  :help
      t.integer :chance_of_multiple, default: 0
      t.string  :type, default: :'Column::Options'
      t.boolean :allow_duplicate_options, default: false

      t.timestamps null: false
    end
  end
end
