json.(product, :id, :name, :description, :image, :rating, :url, :tags, :price,
    :created_at, :updated_at, :author, :views, :default_image, :short_desc, :links)
json.name product.name

json.attachments product.attachments, :id, :attachable_id, :attachable_type, :url, :name, :content_type, :size, :created_at,
:updated_at, :product_id, :author

json.images product.images, :id, :attachable_id, :attachable_type, :url, :name, :content_type, :size, :created_at,
:updated_at, :product_id, :author

json.reviews product.reviews, partial: 'api/reviews/review', as: :review

json.company do
  json.(product.company, :id, :name)
end
