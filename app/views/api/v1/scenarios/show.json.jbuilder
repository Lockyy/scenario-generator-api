json.status 200

json.uuid @scenario_model.uuid

json.generator do
  json.(@generator, :id, :name, :slug, :ad_link, :kind)
end

json.scenario @scenario_model.scenario_hash