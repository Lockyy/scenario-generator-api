#
# Validation::Scenario::Hash
#
# Takes in a Scenario, a column, and a set of option_hashes.
# Checks that the option_hashes are valid for the given column.
#
# An option_hash is valid if:
# a) They exist in the database as children of the column; and
# b) They only contain data from the database. No extra or changed data may be present in the option_hash.
#
class Validation::Scenario::Options
  class << self
    def valid?(scenario, column, option_hashes)
      @scenario = scenario
      @column = column
      @options = @column.options.reverse
      @option_hashes = option_hashes

      validate_options
    end

    private

    def validate_options
      options_exist? && options_correct?
    end

    def options_exist?
      option_ids = @options.map(&:id)
      hash_option_ids = @option_hashes.map { |hash| hash[:id] }
      (hash_option_ids - option_ids).empty?
    end

    def options_correct?
      option_texts = @options.map(&:text)
      hash_option_texts = @option_hashes.map { |hash| hash[:text] }
      (hash_option_texts - option_texts).empty?
    end
  end
end
