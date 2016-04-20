json.generators @generators do |generator|
  json.(generator, :id, :name)

  json.subject do
    json.(generator.subject, :id, :name)
  end
end