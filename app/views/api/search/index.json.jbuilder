json.search_string @results[:search_string]
json.total_results @results[:total_results]
json.per_page      @results[:per_page]
json.page          @results[:page]
json.sorting       @results[:sorting]
json.match_mode    @results[:match_mode]

json.products do
  json.total @results[:products][:total]
  json.pages @results[:products][:pages]
  json.data  @results[:products][:data], partial: 'api/search/product', as: :product
end

json.companies do
  json.total @results[:companies][:total]
  json.pages @results[:companies][:pages]
  json.data  @results[:companies][:data], partial: 'api/companies/company', as: :company
end

json.collections do
  json.total @results[:collections][:total]
  json.pages @results[:collections][:pages]
  json.data  @results[:collections][:data] do |collection|
    json.id collection.id
    json.name collection.name
    json.created_at collection.created_at

    json.user do
      json.name collection.user.name
      json.id collection.user.id
    end
  end
end


json.tags do
  json.total @results[:tags][:total]
  json.data  @results[:tags][:data] do |tag|
    json.(tag, :id, :name, :slug)
  end
end


json.related_tags do
  json.companies do
    json.total @results[:related_tags][:companies][:total]
    json.data  @results[:related_tags][:companies][:data] do |tag|
      json.(tag, :id, :name, :slug)
    end
  end
  json.products do
    json.total @results[:related_tags][:products][:total]
    json.data  @results[:related_tags][:products][:data] do |tag|
      json.(tag, :id, :name, :slug)
    end
  end
  json.collections do
    json.total @results[:related_tags][:collections][:total]
    json.data  @results[:related_tags][:collections][:data] do |tag|
      json.(tag, :id, :name, :slug)
    end
  end
end

json.filtered_tags do
  json.total @results[:filtered_tags][:total]
  json.data  @results[:filtered_tags][:data] do |tag|
    json.(tag, :id, :name, :slug)
  end
end
