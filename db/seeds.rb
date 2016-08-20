puts "Importing #{GAMES.length} generators"

GAMES.each do |key, hash|
  puts "Importing generator #{key}"
  Importing::Generators.process(key, hash)
end
puts "Generators imported"

total_scenarios = EXPORTED_SCENARIOS.length
puts "Importing #{total_scenarios} scenarios"

EXPORTED_SCENARIOS.each_with_index do |exported_scenario, i|
  params = Importing::ScenarioParams.from(exported_scenario)
  puts "#{i}/#{total_scenarios}"  if i % 1000 == 0
  Scenario.create(params)
end
puts "Scenarios imported"
