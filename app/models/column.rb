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

  has_many :columns, as: :parent, dependent: :destroy
  has_many :options, dependent: :destroy
  has_many :exclusion_sets, dependent: :destroy

  validates :min, presence: true, numericality: { only_integer: true, greater_than: -1 }
  # In this validation we want max to always be greater than min.
  # We use (column.min || 0) because of how rspec checks that validations are set up correctly. Because during the min validation check
  # it sets min to nil and then tries to save we get this validation failing as well as the one we want to fail. To prevent that we ensure that
  # there is always a value for max to check by using || 0.
  validates :max, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: proc { |column| (column.min || 0) } }

  before_save :set_generator

  def self.process_all
    all.flat_map(&:process)
  end

  # Recursively generate a scenario for this column
  def process
    options = pick
    child_columns = Option.process_child_columns(options) + columns.process_all
    {
      column:        self,
      options:       options,
      child_columns: child_columns,
    }
  end

  def generate
    [process]
  end

  def create_options(option_strings)
    options.create(option_strings.map { |os| { text: os } })
  end

  def exclusion_array
    false
  end

  private

  def set_generator
    parent_iterator = parent
    parent_iterator = parent_iterator.parent until parent_iterator.class == Generator
    self.generator = parent_iterator
  end
end
