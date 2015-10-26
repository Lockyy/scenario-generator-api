json.search_string params[:search_string]
json.total_results @collections.size

json.collections do
  json.total @collections.size
  json.data  @collections, partial: 'api/collections/small_collection', as: :collection
end