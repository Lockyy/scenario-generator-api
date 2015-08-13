json.(product, :id, :name, :description, :image, :rating, :url, :tags, :price,
    :created_at, :updated_at, :author, :views, :default_image, :images, :short_desc)
json.name titleize(product.name)

json.reviews product.reviews, partial: 'api/reviews/review', as: :review

json.company do
  json.(product.company, :id, :name)
end
