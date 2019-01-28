# frozen_string_literal: true

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
module Validation
  module Scenario
    class Hash
      class << self
        def valid?(scenario)
          validate_hash(scenario)
        end

        private

        def validate_hash(scenario)
          hash_valid?(scenario)
        end

        def overriding_api_version(scenario)
          scenario.api_version.zero?
        end

        def hash_valid?(scenario)
          Validation::Scenario::Keys.valid?(scenario) &&
            child_columns_exist?(scenario) &&
            Validation::Scenario::Columns.valid?(scenario, scenario.scenario_hash[:columns])
        end

        def child_columns_exist?(scenario)
          child_column_ids = scenario.generator.columns.reverse.map(&:id)
          hash_child_column_ids = scenario.scenario_hash[:columns].map { |hash| hash[:id] }

          (hash_child_column_ids - child_column_ids).empty?
        end
      end
    end
  end
end
