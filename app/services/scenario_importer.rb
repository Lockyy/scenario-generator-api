class ScenarioImporter
  def process
    EXPORTED_SCENARIOS.each do |exported_scenario|
      process_scenario(exported_scenario)
    end
  end

  private

  def process_scenario(exported_scenario)
    scenario = Scenario.create({
      uuid:          exported_scenario[:uuid],
      generator:     generator_from_name(exported_scenario[:game], exported_scenario),
      created_at:    exported_scenario[:created_at],
      updated_at:    exported_scenario[:updated_at],
      api_version:   0,
      scenario_hash: format_scenario_hash(exported_scenario[:scenario_hash]),
    })
  end

  def generator_from_name(name, exported_scenario)
    Generator.all.each do |generator|
      generator_name = generator.subject.name
      possible_names = [generator_name, generator.subject.old_name]
      possible_names << generator_name.downcase.gsub(/[^a-zA-Z\d]/, '')
      return generator if possible_names.include?(name)
    end
    raise RuntimeError
  end

  def format_scenario_hash(exported_scenario_hash)
    formatted_hash = { columns: [] }
    exported_scenario_hash[:regular].each do |column_name, options|
      formatted_hash[:columns] << {
        name: column_name,
        options: options.map { |option| { text: option } },
      }
    end
    formatted_hash
  end
end