json.name product.name
json.(product,  :id, :name, :description, :image, :rating,
                :created_at, :updated_at, :author,
                :default_image, :short_desc, :slug)
json.bookmarked product.bookmarked?(current_user)

json.company do
  json.(product.company, :id, :name, :slug) if product.company
end

json.reviews product.reviews, partial: 'api/reviews/review', as: :review