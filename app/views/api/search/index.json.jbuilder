json.search_string params[:search]

json.products @results[:products] do |product|
  json.(product, :id, :name, :description, :url, :company, :rating)
end

json.companies @results[:companies] do |company|
  json.(company, :id, :name, :description, :url)
end

json.tags @results[:tags] do |tag|
  json.(tag, :id, :name)
end
