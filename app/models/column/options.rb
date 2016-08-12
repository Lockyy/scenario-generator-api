# This is an options column. It is for generating a random set of options from a list.
# max: The maximum number of points a stat can have.
# chance_of_multiple: The total points that can be distributed across all stats.
# options: The options are used to determine the stat names.
#
# If there isn't enough space across all the stats to distrubute the total points, it'll return 0 for
# all stats.
class Column::Options < Column
  validates :chance_of_multiple, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: -1 }

  def pick(amount = nil)
    amount = amount ? enforce_amount_rules(amount) : amount_to_pick

    picks = []
    while picks.length < amount
      amount_to_pick = amount - picks.length
      new_picks = sample(options, amount_to_pick)
      picks = Option.without_exclusions(picks + new_picks)
      picks.uniq! unless allow_duplicate_options
    end
    picks
  end

  def exclusion_array
    option_exclusions.map do |exclusion|
      [exclusion.left_option.id, exclusion.right_option.id]
    end
  end

  private

  def sample(options, amount)
    weighted_options = options.select { |option| !option.weight.nil? }
    return weighted_sample(weighted_options, options - weighted_options, amount) unless weighted_options.empty?
    options.sample(amount)
  end

  # Weighted sampling
  # More info here: https://gist.github.com/O-I/3e0654509dd8057b539a
  def weighted_sample(weighted_options, unweighted_options, amount)
    weighted_hash = option_hash_with_weights(weighted_options, unweighted_options, amount)
    Array.new(amount) { weighted_hash.max_by { |_, weight| rand**(1.0 / weight) }.first }
  end

  def option_hash_with_weights(weighted_options, unweighted_options, _amount)
    weights_array = []
    option_array = []
    # Add weights for weighted columns
    weighted_options.each do |option|
      weights_array << option.weight
      option_array << option
    end

    # Create the weights for the unweighted columns. This is just an even split of the remaining weight
    remaining_weight = 1 - weighted_options.map(&:weight).sum
    unweighted_options.each do |option|
      weights_array << remaining_weight / unweighted_options.length
      option_array << option
    end

    # Normalise the weights so it adds up to 1
    weights_array = weights_array.map { |w| (Float w) / weights_array.reduce(:+) }
    # Zip it all up into a hash for easy sampling
    option_array.zip(weights_array).to_h
  end

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
