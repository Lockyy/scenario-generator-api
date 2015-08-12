json.search_string @results[:search_string]
json.total_results @results[:total_results]
json.per_page      @results[:per_page]
json.page          @results[:page]

json.products do
  json.total @results[:products][:total]
  json.pages @results[:products][:pages]
  json.data  @results[:products][:data] do |product|
    json.(product, :id, :name, :short_desc, :url, :rating, :total_reviews)
  end
end

json.companies do
  json.total @results[:companies][:total]
  json.pages @results[:companies][:pages]
  json.data  @results[:companies][:data] do |company|
    json.(company, :id, :name, :short_desc, :url)
  end
end


json.tags do
  json.total @results[:tags][:total]
  json.data  @results[:tags][:data].map(&:name)
end