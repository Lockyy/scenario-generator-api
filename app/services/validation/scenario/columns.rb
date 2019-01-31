# frozen_string_literal: true

module Validation
  module Scenario
    #
    # Validation::Scenario::Columns
    #
    # Takes in a Scenario and a set of column_hashes that are a subset of the scenario's scenario_hash.
    # Checks to make sure that the column hashes are valid for the given scenario.
    # Also recursively checks whether it's child columns and options are valid
    #
    # A column_hash is valid if:
    # a) It's children are exist and are valid;
    # b) It exists in the database;
    # c) It contains only unmodified data from the corresponding database record; and
    # d) It's children columns are all owned by the corresponding database record.
    #
    class Columns
      class << self
        def valid?(scenario, column_hashes)
          validate_columns(scenario, column_hashes)
        end

        private

        def validate_columns(scenario, column_hashes)
          column_hashes.map do |column_hash|
            validate_column(scenario, column_hash)
          end.exclude?(false)
        end

        def validate_column(scenario, column_hash)
          column = scenario.generator.owned_columns.find_by(id: column_hash[:id])
          column_valid?(column, column_hash) && children_valid?(scenario, column, column_hash)
        end

        def children_valid?(scenario, column, column_hash)
          (column_hash[:columns].nil? || Validation::Scenario::Columns.valid?(scenario, column_hash[:columns])) &&
            Validation::Scenario::Options.valid?(column, column_hash[:options])
        end

        def column_valid?(column, column_hash)
          column.present? && column_correct?(column, column_hash) && child_columns_exist?(column, column_hash)
        end

        def column_correct?(column, column_hash)
          column.help == column_hash[:help] &&
            column.name == column_hash[:name]
        end

        def child_columns_exist?(column, column_hash)
          return true if column_hash[:columns].nil? && column.columns.empty?

          abberant_column_ids = hash_child_column_ids(column_hash) - valid_child_column_ids(column)
          abberant_column_ids.empty?
        end

        def hash_child_column_ids(column_hash)
          column_hash[:columns].map { |hash| hash[:id] }
        end

        def valid_child_column_ids(column)
          direct_child_column_ids  = column.columns.reverse.map(&:id)
          options_child_column_ids = column.option_columns.reverse.map(&:id)
          direct_child_column_ids.concat(options_child_column_ids)
        end
      end
    end
  end
end
