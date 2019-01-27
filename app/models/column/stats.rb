# frozen_string_literal: true

# This is a Column::Stats.
# It is used for generating a set of stats to be used by the user.
# For example in Fallout this would assign stats for Charisma, Strength etc.
# Column meanings:
# max: Max points that can be assigned across all stats
#
# min: The starting points in a stat
# max_per: The max points that can be in any one stat
#
class Column::Stats < Column
  # Greater than min because we have to be able to assign at least 1 point
  validates :max_per, presence:     true,
                      numericality: {
                        only_integer: true,
                        greater_than: proc { |column| column.min },
                      }

  def pick(_amount = nil)
    create_sorted_stat_hashes(assign_points_to_options)
  end

  private

  # Turns stats into an array of hashes with all the data that a regular option would have.
  def create_sorted_stat_hashes(stats)
    stat_hashes = stats.map { |stat, value| create_stat_hash(stat, value) }
    # Ensure the stats always come out in the same order
    stat_hashes.sort_by { |a| a[:text] }
  end

  def create_stat_hash(stat, value)
    {
      id:      stat.id,
      text:    "#{stat.text}: #{value}",
      columns: Column.none,
    }
  end

  def base_stats
    # We iterate over options and set it to min manually instead of just doing
    # stats = Hash.new(min) because this way it ensures that every stat definitely appears
    # in the results even if it has no extra points put into it.
    options.map { |stat| [stat, min] }.to_h
  end

  def assign_points_to_options
    stats = base_stats
    points_to_assign.times {
      assign_point_to_random_stat(stats)
    }
    stats
  end

  def assign_point_to_random_stat(stats)
    stats[stat_to_assign_to(stats)] += 1
  end

  def stat_to_assign_to(stats)
    stat = options[rand(options.length)] until stat && stats[stat] < max_per
    stat
  end

  # This is the max points we could assign if we could assign as many as we wanted.
  # If we had 5 options and each had a max_per of 10 and min of 1 then our max assignable points would be 45
  def max_assignable_points
    options.length * (max_per - min)
  end

  def points_to_assign
    [max, max_assignable_points].min
  end
end
