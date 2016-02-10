json.name product.name
json.(product,  :id, :name, :description, :image, :rating, :url,
                :tags, :price, :created_at, :updated_at, :author,
                :views, :default_image, :short_desc, :slug)
json.user_tags  product.user_tags(current_user)
json.bookmarked product.bookmarked?(current_user)

json.formatted_description (product.description.nil? or product.description.empty?) ? "" : simple_format(product.description)
json.review(product.reviews.find_by(user: current_user), :id) if product.reviews.find_by(user: current_user)

json.links product.links, :id, :url, :created_at, :updated_at, :author

json.attachments product.attachments, partial: 'api/v1/attachments/attachment', as: :attachment

json.images product.images, partial: 'api/v1/attachments/attachment', as: :attachment

json.reviews product.reviews, partial: 'api/v1/reviews/review', as: :review

json.company do
  json.(product.company, :id, :name, :slug) if product.company
end

if @related_products
  json.related_products @related_products, partial: 'api/v1/products/related_product', as: :product
end

json.collections product.collections.visible(current_user), partial: 'api/v1/collections/collection', as: :collection