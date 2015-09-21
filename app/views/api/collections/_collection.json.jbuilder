json.(collection, :id, :title, :description,
                  :created_at, :updated_at)

json.length collection.products.size

json.user do
  json.(collection.user, :id, :name)
end

json.products collection.products, partial: 'api/products/small_product', as: :product
