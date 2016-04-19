# These are the columns in a generator.
# It has many options.
#
# id
# name
# generator_id
# spoilers
# min
# max
# help
# chance_of_multiple
# created_at
# updated_at
#
class Column < ActiveRecord::Base
  belongs_to :generator
  belongs_to :parent, polymorphic: true

  has_many :columns, as: :parent
  has_many :options
  has_many :option_exclusions, through: :options, source: :left_option_exclusions

  validates :min, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :max, presence: true, numericality: { only_integer: true, :greater_than => Proc.new { |column| (column.min || 1) - 1 } }
  validates :chance_of_multiple, presence: true, numericality: { only_integer: true, greater_than: -1 }

  def absolute_max_options
    options.length - option_exclusions.length
  end

  def pick
    quantity = amount_to_pick
    picks = options.sample(quantity).without_exclusions
    while picks.length < quantity
      new_picks = (all - picks).sample(quantity - picks.length)
      picks += new_picks
      picks = picks.without_exclusions
    end
  end

  def amount_to_pick
    amount = min
    return amount if chance_of_multiple == 0
    amount += 1 while rand(100) <= chance_of_multiple && amount < max && amount < absolute_max_options
    amount
  end
end
