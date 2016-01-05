json.name product.name
json.(product,  :id, :name, :description, :image, :rating, :url,
                :tags, :price, :created_at, :updated_at, :author,
                :views, :short_desc, :links, :slug)
json.user_tags  product.user_tags(current_user)
json.bookmarked product.bookmarked?(current_user)

json.formatted_description (product.description.nil? or product.description.empty?) ? "" : simple_format(product.description)
json.review(product.reviews.find_by(user: current_user), :id) if product.reviews.find_by(user: current_user)

json.attachments product.attachments, :id, :attachable_id, :attachable_type, :url, :name, :content_type, :size, :created_at,
:updated_at, :product_id, :author

json.reviews product.reviews, partial: 'api/reviews/review', as: :review

json.company do
  json.(product.company, :id, :name, :slug) if product.company
end