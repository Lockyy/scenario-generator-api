# This is a stats column. It is used for generating stats, for example in fallout generating a set of stats
# for a character and distributing points between them.
# In this type of column we are using the attributes of Column differently.
# max: The maximum number of points a stat can have.
# chance_of_multiple: The total points that can be distributed across all stats.
# options: The options are used to determine the stat names.
#
# If there isn't enough space across all the stats to distrubute the total points, it'll return 0 for
# all stats.
class Column::Options < Column
  validates :min, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :max, numericality: { only_integer: true, greater_than_or_equal_to: proc { |column| (column.min || 1) } }
  validates :chance_of_multiple, numericality: { only_integer: true, greater_than: -1 }

  def pick(amount = nil)
    amount = amount ? enforce_amount_rules(amount) : amount_to_pick

    picks = Option.without_exclusions(options.sample(amount))
    while picks.length < amount
      new_picks = (options - picks).sample(amount - picks.length)
      picks = Option.without_exclusions(picks + new_picks)
    end
    picks
  end

  private

  # This is the max amount of options available
  # If we have three options but two of them exclude each other then we will actually only
  # be able to pick two options, because if you try to go to three you'll always get a conflict.
  def max_options
    [options.length - option_exclusions.length, max].min
  end

  def amount_to_pick
    amount = min
    return amount if chance_of_multiple == 0
    amount += 1 while rand(100) <= chance_of_multiple && amount < max_options
    enforce_amount_rules(amount)
  end

  def enforce_amount_rules(amount)
    [max_options, [amount, min].max].min
  end

  def exclusion_array
    option_exclusions.map do |exclusion|
      [exclusion.left_option.id, exclusion.right_option.id]
    end
  end
end
