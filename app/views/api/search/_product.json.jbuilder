json.name product.name
json.(product, :id, :name, :description, :rating)
json.company do
  json.id product.company.id
  json.name product.company.name
end
json.reviews product.reviews do |review|
  json.id review.id
end
