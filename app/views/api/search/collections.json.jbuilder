json.search_string params[:search_string]
json.total_results @owned_collections.size + @tag_collections.size

json.collections do
  json.owned do
    json.total @owned_collections.size
    json.title 'Collections you own and collaborate on:'
    json.data  @owned_collections, partial: 'api/collections/small_collection', as: :collection
  end

  json.tags do
    json.total @tag_collections.size
    json.title 'Collections with tags related to your search:'
    json.data  @tag_collections, partial: 'api/collections/small_collection', as: :collection
  end
end