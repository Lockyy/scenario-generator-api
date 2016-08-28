json.status 200

json.generators @generators do |generator|
  json.(generator, :id, :name, :slug, :ad_link, :kind)
end