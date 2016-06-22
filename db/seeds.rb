i = Importer.new
GAMES.each do |key, hash|
  puts "Creating generator for #{key}"
  i.process(key, hash)
end

i = ScenarioImporter.new
i.process
