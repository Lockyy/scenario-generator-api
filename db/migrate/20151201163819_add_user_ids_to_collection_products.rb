class AddUserIdToCollectionProducts < ActiveRecord::Migration
  def change
    CollectionProduct.all.each do |collection_product|
      unless collection_product.user_id
        collection_product.user_id = collection_product.collection.user.id
        collection_product.save
      end
    end
  end
end
