#
# Validation::Scenario::Hash
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
class Validation::Scenario::Columns
  class << self
    def valid?(scenario, column_hashes)
      @scenario = scenario
      @column_hashes = column_hashes

      validate_columns
    end

    private

    def validate_columns
      @column_hashes.each do |column_hash|
        @column_hash = column_hash
        return false unless validate_column
      end
      true
    end

    def validate_column
      @column = @scenario.generator.owned_columns.find_by(id: @column_hash[:id])
      column_valid? && children_valid?
    end

    def children_valid?
      (@column_hash[:columns].nil? || Validation::Scenario::Columns.valid?(@scenario, @column_hash[:columns])) &&
        Validation::Scenario::Options.valid?(@scenario, @column, @column_hash[:options])
    end

    def column_valid?
      @column && column_correct? && child_columns_exist?
    end

    def column_correct?
      @column.help == @column_hash[:help] &&
        @column.name == @column_hash[:name]
    end

    def child_columns_exist?
      return true if @column_hash[:columns].nil? && @column.columns.empty?

      direct_child_column_ids = @column.columns.reverse.map(&:id)
      options_child_column_ids = @column.option_columns.reverse.map(&:id)
      child_column_ids = direct_child_column_ids.concat options_child_column_ids

      hash_child_column_ids = @column_hash[:columns].map { |hash| hash[:id] }

      (hash_child_column_ids - child_column_ids).empty?
    end
  end
end
