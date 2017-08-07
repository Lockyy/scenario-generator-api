puts "Importing #{GAMES.length} generators"

GAMES.each do |key, hash|
  puts "Importing generator #{key}"
  Importing::Generators.process(key, hash)
end
puts "Generators imported"

total_scenarios = EXPORTED_SCENARIOS.length
puts "Importing #{total_scenarios} scenarios"

EXPORTED_SCENARIOS.each_slice(100) do |scenarios_slice|
  scenarios_slice.each do |exported_scenario|
    next if Scenario.find_by(uuid: exported_scenario[:uuid]).present?
    params = Importing::ScenarioParams.from(exported_scenario)
    Scenario.create(params)
  end
end
puts "Scenarios imported"

