GAMES.each do |key, hash|
  puts "Creating generator for #{key}"
  Importer.process(key, hash)
end

ScenarioImporter.process
