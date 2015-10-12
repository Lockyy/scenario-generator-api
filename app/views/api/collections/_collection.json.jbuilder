json.(collection, :id, :title, :description, :privacy,
                  :created_at, :updated_at)

json.length collection.products.size

json.user do
  json.(collection.user, :id, :name)
end

json.products collection.products, partial: 'api/products/small_product', as: :product

if(collection.user == current_user)
  json.users collection.sharees, partial: 'api/users/search_user', as: :user
end