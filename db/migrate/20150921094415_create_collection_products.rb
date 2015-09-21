class CreateCollectionProducts < ActiveRecord::Migration
  def change
    create_table :collection_products do |t|
      t.integer :product_id
      t.integer :collection_id

      t.timestamps null: false
    end
  end
end
