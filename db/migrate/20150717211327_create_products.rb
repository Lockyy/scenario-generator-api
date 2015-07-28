class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.string :url
      t.belongs_to :company

      t.timestamps null: false
    end
  end
end
