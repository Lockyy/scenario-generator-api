# frozen_string_literal: true

#
# Validation::Scenario::Hash
#
# Takes in a Scenario and recursively checks that no unacceptable keys are included in the hash
#
# An scenario_hash's keys are valid if:
# a) Columns only contain keys from ALLOWED_COLUMN_KEYS;
# b) Options only contain keys from ALLOWED_OPTION_KEYS; and
# c) The root hash is equal to ALLOWED_ROOT_KEYS.
#
# These are checked recursively.
#
module Validation
  module Scenario
    class Keys
      class << self
        ALLOWED_COLUMN_KEYS = %w[id name help options columns].freeze
        ALLOWED_OPTION_KEYS = %w[id text].freeze
        ALLOWED_ROOT_KEYS = %w[columns].freeze

        def valid?(scenario)
          validate_keys(scenario, scenario.scenario_hash)
        end

        private

        def validate_keys(scenario, scenario_hash)
          root_key_valid?(scenario, scenario_hash) && columns_keys_valid?(scenario_hash)
        end

        def root_key_valid?(_scenario, scenario_hash)
          scenario_hash.keys.map(&:to_s) == ALLOWED_ROOT_KEYS
        end

        def columns_keys_valid?(scenario_hash)
          scenario_hash[:columns].map { |column| column_keys_valid?(column) }.exclude?(false)
        end

        def column_keys_valid?(column)
          column.keys.each do |key|
            return false unless ALLOWED_COLUMN_KEYS.include? key
          end
          column_children_keys_valid?(column)
        end

        def column_children_keys_valid?(column)
          options_valid?(column) && child_columns_valid?(column)
        end

        def options_valid?(column)
          column[:options].map(&method(:options_keys_valid?)).all?
        end

        def child_columns_valid?(column)
          return true if column[:columns].nil?

          column[:columns].map(&method(:column_keys_valid?)).all?
        end

        def options_keys_valid?(option)
          option.keys.each do |key|
            return false unless ALLOWED_OPTION_KEYS.include? key
          end
          true
        end
      end
    end
  end
end
