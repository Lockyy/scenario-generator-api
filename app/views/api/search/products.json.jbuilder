json.search_string params[:search_string]
json.total         @products.size

json.products @products, partial: 'api/search/product', as: :product