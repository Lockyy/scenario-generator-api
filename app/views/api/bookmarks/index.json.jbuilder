json.total @products.size
json.ids @products.map(&:id)
json.products @products, partial: 'api/products/product', as: :product
