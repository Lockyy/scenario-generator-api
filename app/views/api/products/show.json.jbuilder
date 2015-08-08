json.(@product, :id, :name, :description, :image, :rating, :url, :reviews, :tags, :price, :created_at, :updated_at, :author, :views, :default_image, :images)

json.company do
  json.(@product.company, :id, :name)
end
