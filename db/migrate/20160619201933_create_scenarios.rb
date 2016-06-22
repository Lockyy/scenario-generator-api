class CreateScenarios < ActiveRecord::Migration
  def change
    create_table :scenarios do |t|
      t.integer :generator_id
      t.string  :uuid
      t.string  :scenario_hash
      t.integer :api_version

      t.timestamps null: false
    end
  end
end
