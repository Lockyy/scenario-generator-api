class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string :url
      t.references :review

      t.timestamps null: false
    end
  end
end
