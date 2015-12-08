json.type type
json.items data do |collection|
  json.(collection, :id, :name, :description, :privacy,
                    :created_at, :updated_at, :display_date)

  json.length collection.products.length

  json.user do
    json.(collection.user, :id, :name, :avatar_url)
  end
end