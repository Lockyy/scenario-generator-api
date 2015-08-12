json.company do
  json.name @company.name
  json.url @company.url
  json.image_url @company.avatar
  json.products @company.products, :id, :name, :description, :image, :company, :rating, :reviews, :created_at, :author
  json.tags @company.tags
end
