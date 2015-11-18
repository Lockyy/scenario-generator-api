json.(collection, :id, :title, :description, :privacy,
                  :created_at, :updated_at, :display_date)

json.length collection.cached_products_length

json.user do
  json.(collection.user, :id, :name)
end

json.products collection.products, partial: 'api/products/small_product', as: :product