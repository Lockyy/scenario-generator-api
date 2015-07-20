json.array! ['recently_added'] do |type|
  json.type type
  json.items @products, :id, :name, :description, :image, :company, :rating, :reviews, :created_at, :author
end
