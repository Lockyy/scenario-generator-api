class AddCachedProductLengthToCollections < ActiveRecord::Migration
  def change
    add_column :collections, :cached_products_length, :integer, :null => false, :default => 0
    CollectionProduct.counter_culture_fix_counts
  end
end
