json.search_string params[:search_string]
json.total         @products.size

json.products @products do |product|
  json.name product.name
  json.(product, :id, :name, :description)

  json.reviews product.reviews do |review|
    json.id review.id
  end
end