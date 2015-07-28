json.type type
json.set! 'items' do
  json.products data[:products], :id, :name, :description, :image, :company, :rating, :reviews, :created_at, :author
  json.tags data[:tags]
end
