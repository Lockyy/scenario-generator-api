# frozen_string_literal: true

# == Schema Information
#
# Table name: exclusion_sets
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  column_id  :integer
#


# A set of options that are exclusive to each other.
# If an option in an exclusion set is in a set of options then no other options from that set can be returned.
class ExclusionSet < ApplicationRecord
  has_many :option_exclusions, dependent: :destroy
  has_many :options, through: :option_exclusions

  belongs_to :column

  before_save :ensure_column

  validate :all_options_same_column
  validates :option_exclusions, length: { minimum: 1 }

  private

  def ensure_column
    column ||= options.first.column
  end

  def all_options_same_column
    columns = options.map(&:column).uniq
    errors :options, 'are not all from the same column' if columns.length > 1
  end
end
