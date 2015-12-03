class AddUserIdToCollectionProducts < ActiveRecord::Migration
  def change
    add_column :collection_products, :user_id, :integer
    CollectionProduct.all.each do |collection_product|
      collection_product.user_id = collection_product.collection.user.id
      collection_product.save
    end
  end
end
