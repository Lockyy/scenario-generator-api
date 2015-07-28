Fletcher::Dashboard::SECTIONS.each do |type|
  json.set! type do
    json.type type
    json.items @dashboard.send(type), :id, :name, :description, :image, :company, :rating, :reviews, :created_at, :author
  end
end
