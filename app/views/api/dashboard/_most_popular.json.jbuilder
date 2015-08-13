json.type type
json.set! 'items' do
  json.products data[:products], partial: 'api/products/product', as: :product

  json.tags data[:tags]
end
