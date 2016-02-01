json.type type
json.items data do |product|
  json.(product,  :id, :name, :description, :image, :rating,
                    :created_at, :updated_at, :default_image, :short_desc,
                    :slug)

  json.reviews product.reviews do |review|
    json.id review.id
  end

  json.company do
    json.(product.company, :id, :name, :slug) if product.company
  end
end