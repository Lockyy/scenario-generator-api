json.search_string @results[:search_string]
json.total_results @results[:total_results]
json.per_page      @results[:per_page]
json.page          @results[:page]

json.products do
  json.total @results[:products][:total]
  json.pages @results[:products][:pages]
  json.data  @results[:products][:data], partial: 'api/products/product', as: :product
end

json.companies do
  json.total @results[:companies][:total]
  json.pages @results[:companies][:pages]
  json.data  @results[:companies][:data], partial: 'api/companies/company', as: :company
end


json.tags do
  json.total @results[:tags][:total]
  json.data  @results[:tags][:data] do |tag|
    json.(tag, :id, :name)
  end
end


json.related_tags do
  json.total @results[:related_tags][:total]
  json.data  @results[:related_tags][:data] do |tag|
    json.(tag, :id, :name)
  end
end

json.filtered_tags do
  json.total @results[:filtered_tags][:total]
  json.data  @results[:filtered_tags][:data] do |tag|
    json.(tag, :id, :name)
  end
end
