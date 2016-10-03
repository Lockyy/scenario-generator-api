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
      return options_exist? && stats_correct? if @column.type == 'Column::Stats'
      options_exist? && options_correct?
    end

    def options_exist?
      option_ids = @options.map(&:id)
      hash_option_ids = @option_hashes.map { |hash| hash[:id] }
      (hash_option_ids - option_ids).empty?
    end

    def option_texts
      @options.map(&:text)
    end

    def map_option_hash_texts
      @option_hashes.map { |hash| hash[:text] }
    end

    def valid_option_strings?(option_strings)
      (option_strings - option_texts).empty?
    end

    def options_correct?
      valid_option_strings?(map_option_hash_texts)
    end

    def stats_correct?
      stat_strings = map_option_hash_texts
      option_strings = []
      stat_strings.each do |option_text|
        return false unless option_text =~ /^.+: \d+$/
        # We use rpartition instead of split so that we can split the string into everything up to the last
        # colon and everything after.
        # This is because 'asd: 1: 1' would be a valid stat option hash text if 'asd: 1' was the option model's text.
        option_string, _, option_stat = option_text.rpartition(': ')
        option_strings << option_string
        option_stat_integer = Float(option_stat)
        return false unless option_stat_integer.between?(@column.min, @column.max_per)
      end
      valid_option_strings?(option_strings)
    rescue
      return false
    end
  end
end
