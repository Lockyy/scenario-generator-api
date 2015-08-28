json.type type
json.set! 'items' do
  data.each do |tag, products|
    json.set! tag, products, partial: 'api/products/product', as: :product
  end
end
