json.(collection, :id, :title, :description, :privacy,
                  :created_at, :updated_at)

json.length collection.products.size

json.user do
  json.(collection.user, :id, :name)
end

json.products collection.products.first(3), partial: 'api/products/tiny_product', as: :product