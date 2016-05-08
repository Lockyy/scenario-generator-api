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

  # This is the max amount of options available
  # If we have three options but two of them exclude each other then we will actually only
  # be able to pick two options, because if you try to go to three you'll always get a conflict.
  def max_options
    [options.length - option_exclusions.length, max].min
  end

 # Recursively generate a scenario using the passed in column
  def process(column)
    columns = []

    options = column.pick

    child_columns = []
    # If the options we picked have columns then we need to recursively add their columns to the array
    # Doing it here ensures that it appears in the correct place in the scenario
    options.each do |option|
      option.columns.each do |column|
        child_columns += process_column(column)
      end
    end

    # If this column has any child columns, recursively add them to the array as well
    column.columns.each do |column|
      child_columns += process_column(column)
    end

    # Add the current column, it's options, and any child columns to the array
    columns << {
      column: column,
      options: options,
      child_columns: child_columns,
    }

    return columns
  end

  def pick(amount = nil)
    amount = amount ? enforce_amount_rules(amount) : amount_to_pick

    picks = Option.without_exclusions(options.sample(amount))
    while picks.length < amount
      new_picks = (options - picks).sample(amount - picks.length)
      picks = Option.without_exclusions(picks + new_picks)
    end
    picks
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
