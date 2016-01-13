class AddUserIdToCollectionProducts < ActiveRecord::Migration
  def change
    add_column :collection_products, :user_id, :integer
  end
end
