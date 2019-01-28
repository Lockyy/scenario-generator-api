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
class Column < ApplicationRecord
  belongs_to :generator, inverse_of: :owned_columns

  has_many :column_parents
  has_many :child_columns_parents, as: :parent, class_name: 'ColumnParent'
  has_many :columns, through: :child_columns_parents, as: :parent, dependent: :destroy
  has_many :parent_columns,    through: :column_parents, source: :parent, source_type: 'Column', dependent: :destroy
  has_many :parent_options,    through: :column_parents, source: :parent, source_type: 'Option', dependent: :destroy
  has_many :parent_generators, through: :column_parents, source: :parent, source_type: 'Generator', dependent: :destroy
  has_many :options,        dependent: :destroy
  has_many :option_columns, through: :options, source: :columns
  has_many :exclusion_sets, dependent: :destroy

  validates :min, presence: true, numericality: { only_integer: true, greater_than: -1 }
  # In this validation we want max to always be greater than min.
  # We use (column.min || 0) because of how rspec checks that validations are set up correctly. Because during the min validation check
  # it sets min to nil and then tries to save we get this validation failing as well as the one we want to fail. To prevent that we ensure that
  # there is always a value for max to check by using || 0.
  validates :max, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: proc { |column| (column.min || 0) } }

  acts_as_list scope: :generator_id

  before_save :set_generator

  def self.process_all
    all.flat_map(&:process)
  end

  def parents
    parent_columns + parent_options + parent_generators
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

  def search_for_generator
    return generator if generator

    parents.each do |parent|
      return parent if parent.class == Generator

      parent_search_result = parent.search_for_generator
      return parent_search_result if parent_search_result.class == Generator
    end
    false
  end

  private

  def set_generator
    root_generator = search_for_generator
    return self.generator = root_generator if root_generator.class == Generator

    raise 'No (recursive) parent of column is generator'
  end
end
