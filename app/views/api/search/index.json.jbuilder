json.search_string params[:search]

json.products @results[:products] do |product|
  json.(product, :id, :name, :short_desc, :url, :rating, :total_reviews)
end

json.companies @results[:companies] do |company|
  json.(company, :id, :name, :short_desc, :url)
end

json.tags @results[:tags].map(&:name)