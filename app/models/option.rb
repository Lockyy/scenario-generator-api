# frozen_string_literal: true

# This is an option for it's parent.
# An option may have a column dependent on it. These are stored in the columns relation.
# It will be inserted into the generated scenario by the generator.
#
# id
# text
# created_at
# updated_at
#
class Option < ApplicationRecord
  belongs_to :column

  has_many :column_parents, as: :parent
  has_many :columns, through: :column_parents, as: :parent, dependent: :destroy
  has_many :option_exclusions, dependent: :destroy
  has_many :exclusion_sets, through: :option_exclusions
  has_many :excluded_options, through: :exclusion_sets, class_name: 'Option', source: :options

  alias parent column

  def self.process_child_columns(options)
    options.flat_map do |option|
      columns = option[:columns] || option.columns
      columns.process_all
    end
  end

  def self.sample_without_exclusions(total_amount = 1, allow_duplicates = false)
    options = []
    while (remaining_options = total_amount - options.length) > 0
      new_options = all.sample(remaining_options)
      options = merge_without_exclusions(options, new_options, allow_duplicates)
    end
    options
  end

  def self.merge_without_exclusions(options, new_options, allow_duplicates)
    Option.without_exclusions(options + new_options).tap do |merged_options|
      merged_options.uniq! unless allow_duplicates
    end
  end

  def self.sample(amount = 1)
    option_weight_hash = all.map { |option| [option, option.weight] }.to_h
    WeightedRandomizer.new(option_weight_hash).sample(amount)
  end

  # We do it this way instead of like this:
  # ```
  # all_options.each do |option|
  #   all_options -= option.exclusions
  # end
  # ```
  # because the all_options used by the each is not the same as the one we remove from.
  # If the code was set up like that then every time there was an exclusion both sides of the exclusion would be
  # removed, instead of just one.
  # TODO: Refactor
  def self.without_exclusions(options)
    all_options = options
    (0..all_options.length).each do |option_index|
      option = all_options[option_index]
      break unless option

      all_options -= option.exclusions
    end
    all_options
  end

  # If an option appears in exclusions then it cannot be included in the same column as this one.
  def exclusions
    all_exclusions = excluded_options.to_a
    all_exclusions.delete self
    all_exclusions
  end

  def search_for_generator
    column_search_result = column.search_for_generator
    return column_search_result if column_search_result.class == Generator

    false
  end
end
