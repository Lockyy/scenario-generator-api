json.status 200

json.(@subject, :id, :name)
json.total_generators @subject.generators.length
json.generators @subject.generators do |generator|
  json.(generator, :id, :name)
end