# frozen_string_literal: true

# This is an options column. It is for generating a random set of options from a list.
# max: The maximum number of points a stat can have.
# chance_of_multiple: The total points that can be distributed across all stats.
# options: The options are used to determine the stat names.
#
# If there isn't enough space across all the stats to distrubute the total points, it'll return 0 for
# all stats.
class Column
  class Options < Column
    validates :chance_of_multiple, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: -1 }

    def pick(amount = amount_to_pick)
      amount = enforce_amount_rules(amount)
      options.sample_without_exclusions(amount, allow_duplicate_options)
    end

    private

    # This is the max amount of options available
    # If we have three options but two of them exclude each other then we will actually only
    # be able to pick two options, because if you try to go to three you'll always get a conflict.
    def max_options
      return max if allow_duplicate_options

      options_in_exclusion_sets = exclusion_sets.map { |es| es.options.length }.sum
      [options.length + exclusion_sets.length - options_in_exclusion_sets, max].min
    end

    def amount_to_pick
      return (min..max).to_a.sample if chance_of_multiple < 0
      return min if chance_of_multiple == 0

      amount = min
      amount += 1 while rand(100) <= chance_of_multiple && amount < max_options
      enforce_amount_rules(amount)
    end

    def enforce_amount_rules(amount)
      [max_options, [amount, min].max].min
    end
  end
end
