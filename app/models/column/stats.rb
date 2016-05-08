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
  validates :min, presence:     true,
                  numericality: {
                    only_integer: true,
                    greater_than: 0,
                  }

  validates :max_per, presence:     true,
                      numericality: {
                        only_integer: true,
                        greater_than: proc { |column| column.min },
                      }

  validates :max, presence:     true,
                  numericality: { only_integer: true }

  def pick(_amount = nil)
    available_stats = options
    # We iterate over available_stats and set it to min manually instead of just doing
    # stats = Hash.new(min) because this way it ensures that every stat definitely appears
    # in the results even if it has no points put into it.
    stats = {}
    available_stats.each{ |stat| stats[stat] = min }
    max.times do
      stat = nil
      loop do
        stat = available_stats[rand(available_stats.length)]
        break if stats[stat] < max_per
      end
      stats[stat] += 1
    end

    # Turn them into an array of hashes with all the data that a regular option would have.
    stats.map do |stat, value|
      {
        id:      stat.id,
        text:    "#{stat.text}: #{value}",
        columns: [],
      }
    end.sort { |x, y| x[:text] <=> y[:text] } # Ensure the stats always come out in the same order
  end

  # This is the max points we could assign if we could assign as many as we wanted.
  # If we had 5 options and each had a max_per of 10 and min of 1 then our max assignable points would be 45
  def max_assignable_points
    options.length * (max_per - min)
  end
end
