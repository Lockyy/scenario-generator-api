json.status 200

json.generator do
  json.(@generator, :id, :name)
  json.subject do
    json.(@generator.subject, :id, :name, :ad_link)
  end
end

json.scenario @scenario