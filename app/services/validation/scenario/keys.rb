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
class Validation::Scenario::Keys
  class << self
    ALLOWED_COLUMN_KEYS = %w(id name help options columns).freeze
    ALLOWED_OPTION_KEYS = %w(id text).freeze
    ALLOWED_ROOT_KEYS = %w(columns).freeze

    def valid?(scenario)
      @scenario = scenario
      @hash = scenario.scenario_hash
      validate_keys
    end

    private

    def validate_keys
      root_key_valid? && columns_keys_valid?
    end

    def root_key_valid?
      @hash.keys == ALLOWED_ROOT_KEYS
    end

    def columns_keys_valid?
      @hash[:columns].map { |column| column_keys_valid?(column) }.exclude?(false)
    end

    def column_keys_valid?(column)
      column.keys.each do |key|
        return false unless ALLOWED_COLUMN_KEYS.include? key
      end
      column_children_keys_valid?(column)
    end

    def column_children_keys_valid?(column)
      column[:options].map { |child_option| options_keys_valid?(child_option) }.exclude?(false) &&
        column[:columns].map { |child_column| column_keys_valid?(child_column) }.exclude?(false)
    end

    def options_keys_valid?(option)
      option.keys.each do |key|
        return false unless ALLOWED_OPTION_KEYS.include? key
      end
      true
    end
  end
end
