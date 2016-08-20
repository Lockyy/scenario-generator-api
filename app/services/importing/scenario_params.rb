# Takes in list of exported scenarios created in config/initializers/exportedScenarios.rb and creates
# Scenario records for each of them. This is so we can export the scenarios from the old site into the new site.
#
class Importing::ScenarioParams
  class << self
    def from(exported_scenario)
      @exported_scenario = exported_scenario
      build_params
    end

    private

    def build_params
      {
        uuid:          @exported_scenario[:uuid],
        created_at:    @exported_scenario[:created_at],
        updated_at:    @exported_scenario[:updated_at],
        generator:     Generator.find_from_name(@exported_scenario[:game]),
        api_version:   0,
        scenario_hash: {
          columns: create_scenario_hash,
        },
      }
    end

    def create_scenario_hash
      @exported_scenario[:scenario_hash][:regular].map do |column_name, options|
        create_column_hash(column_name, options)
      end
    end

    def create_column_hash(column_name, options)
      {
        name:    column_name,
        options: create_options_hash(options),
      }
    end

    def create_options_hash(options)
      options.map { |option| { text: option } }
    end
  end
end
