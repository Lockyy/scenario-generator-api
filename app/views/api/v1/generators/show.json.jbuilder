json.status 200

json.(@generator, :id, :name, :slug, :ad_link, :kind)
json.columns @generator.columns, partial: 'api/v1/generators/column', as: :column