if @collection
  json.success true
  json.partial! 'collection', locals: {collection: @collection}
else
  json.success false
end