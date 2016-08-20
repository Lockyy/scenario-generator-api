#
# Validation::Scenario::Hash
#
# Takes in a Scenario and checks whether its scenario_hash is valid
# Lots of recursion and validation throughout the hash.
#
# A scenario_hash is valid if:
# a) Scenario.api_version == 0. This is because these are imported directly from the old site and
#    do not have corresponding database tables;
# b) No dissallowed keys are present;
# c) The first level of columns are direct_columns of the generator; and
# d) All columns are valid.
#
class Validation::Scenario::Hash
  class << self
    def valid?(scenario)
      @scenario = scenario
      @hash = scenario.scenario_hash

      validate_hash
    end

    private

    def validate_hash
      overriding_api_version || hash_valid?
    end

    def overriding_api_version
      @scenario.api_version == 0
    end

    def hash_valid?
      Validation::Scenario::Keys.valid?(@scenario) &&
        child_columns_exist? &&
        Validation::Scenario::Columns.valid?(@scenario, @hash[:columns])
    end

    def child_columns_exist?
      child_column_ids = @scenario.generator.columns.reverse.map(&:id)
      hash_child_column_ids = @hash[:columns].map { |hash| hash[:id] }

      (hash_child_column_ids - child_column_ids).empty?
    end
  end
end
