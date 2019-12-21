# frozen_string_literal: true

# == Schema Information
#
# Table name: columns
#
#  id                      :bigint(8)        not null, primary key
#  allow_duplicate_options :boolean          default(FALSE)
#  chance_of_multiple      :integer          default(0)
#  help                    :string
#  max                     :integer          default(1)
#  max_per                 :integer
#  min                     :integer          default(1)
#  name                    :string
#  position                :integer
#  spoilers                :boolean          default(FALSE)
#  type                    :string           default("Column::Options")
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  generator_id            :integer
#
# Indexes
#
#  index_columns_on_generator_id  (generator_id)
#

# This is a Column::Stats.
# It is used for generating a set of stats to be used by the user.
# For example in Fallout this would assign stats for Charisma, Strength etc.
# Column meanings:
# max: Max points that can be assigned across all stats
#
# min: The starting points in a stat
# max_per: The max points that can be in any one stat
#
class Column
  class Stats < Column
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
      stats.map(&method(:create_stat_hash))
    end

    def create_stat_hash(stat, value)
      {
        id:      stat.id,
        text:    "#{stat.text}: #{value}",
        columns: Column.none,
      }
    end

    def base_stats
      # We do this rather than Hash.new(min) to ensure all options appear in the final hash
      options.order(:id).to_a.product([min]).to_h
    end

    def points_to_assign
      [max - (options.count * min), 0].max
    end

    def assign_points_to_options
      stats = base_stats

      points_to_assign.times do
        assignable_stats = stats.select { |stat, value| value < max_per }.to_h.keys
        return stats if assignable_stats.empty?

        stats[assignable_stats.sample] += 1
      end

      stats
    end
  end
end
