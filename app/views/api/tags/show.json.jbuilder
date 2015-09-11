json.tag @tag.name
json.sorting params[:sorting]
json.page params[:page]
json.followed @tag.followed? current_user

json.products do
  json.total @total_products
  json.pages @products.total_pages
  json.data @products, partial: 'api/tags/product', as: :product
end
