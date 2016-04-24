json.(@generator, :id, :name)
json.subject do
  json.(@generator.subject, :id, :name)
end
json.column @generator.column, partial: 'api/v1/generators/column', as: :column