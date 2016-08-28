json.status 200

json.generator do
  json.(@generator, :id, :name, :slug, :ad_link, :kind)
end

json.scenario do
  json.columns @scenario, partial: 'api/v1/scenarios/column', as: :column
end