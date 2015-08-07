json.array!(@companies) do |company|
  json.extract! company, :id, :name, :image_url, :url, :products, :tags
end
