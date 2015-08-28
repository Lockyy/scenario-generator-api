json.tag @tag.name
json.sort_by params[:sort_by]
json.followed @tag.followed? current_user

json.products do
  json.total @total_products
  json.pages @products.total_pages
  json.data @products, partial: 'api/tags/product', as: :product
end