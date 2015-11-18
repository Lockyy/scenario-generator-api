class CollectionProduct < ActiveRecord::Base

  belongs_to :collection
  belongs_to :product
  counter_culture :collection, :column_name => "cached_products_length"

  validates :collection_id, uniqueness: { scope: :product_id }

end
