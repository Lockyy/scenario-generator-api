json.total @products.size
json.ids @products.map(&:id)
json.products @products, partial: 'api/v1/products/product', as: :product
