json.status 200

json.(@generator, :id, :name, :slug, :ad_link, :kind)
json.columns @generator.columns.old_to_new, partial: 'api/v1/generators/column', as: :column
