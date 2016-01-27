json.name product.name
json.(product, :id, :name, :description, :rating, :slug)
json.company do
  json.id product.company.id
  json.name product.company.name
  json.slug product.company.slug
end
json.reviews product.reviews do |review|
  json.id review.id
end
