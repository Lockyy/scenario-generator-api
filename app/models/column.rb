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

  # Recursively generate a scenario for this column
  def process
    column_hash = {
      column:        self,
      options:       pick,
      child_columns: [],
    }

    # If the options we picked have columns then we need to recursively add their columns to the array
    # Doing it here ensures that it appears in the correct place in the scenario
    column_hash[:options].each do |option|
      columns = option[:columns] || option.columns
      columns.each do |column|
        column_hash[:child_columns] << column.process
      end
    end

    # If this column has any child columns, recursively add them to the array as well
    columns.each do |column|
      column_hash[:child_columns] << column.process
    end

    column_hash
  end

  def create_options(option_strings)
    options.create(option_strings.map { |os| {text: os} })
  end

  def exclusion_array
    false
  end

  private

  def set_generator
    p = parent
    p = p.class.name == 'Option' ? p.column : p.parent while p.class.name != 'Generator'
    self.generator = p
  end
end
