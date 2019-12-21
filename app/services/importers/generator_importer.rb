# frozen_string_literal: true

class Importers::GeneratorImporter
  def initialize(generator_slug:, params:)
    @generator_slug = generator_slug
    @params = params
  end

  # Creates generator record and then iterates over columns to produce column records
  # Returns generator
  def process
    puts "Importing #{generator_slug}"
    ActiveRecord::Base.transaction do
      build_generator.tap do |generator|
        params[:columns].each do |column_key, column_hash|
          process_column(column_key, column_hash, generator, generator)
        end
      end
    rescue StandardError => e
      raise "failed to import #{generator_slug}: #{e.message}"
    end
  end

  private

  attr_reader :params, :generator_slug

  def build_generator
    Generator.create!(
      name:    params[:title],
      kind:    params[:generator_title],
      ad_link: params[:buy_link]
    )
  end

  # Produces hash of params and then creates column
  # Uses process_options to create options and their sub-columns
  def process_column(column_key, column_hash, parent, generator)
    column_params = create_column_params(column_key, column_hash)
    column_params.merge!(generator: generator)
    column = parent.columns.create!(column_params)
    process_options(column_hash[:options], column, generator)
    column
  end

  # Groups options by type and then passes them along to the relevant processing function
  def process_options(options_array, column_model, generator)
    option_types = options_array.group_by(&:class)
    option_types.each do |type, options|
      case type.name
      when 'Symbol', 'String'
        column_model.create_options(options)
      when 'Hash'
        process_hash_options(options, column_model, generator)
      when 'Array'
        process_array_options(options, column_model)
      end
    end
  end

  # This is for processing options with sub-columns
  # First it looks for the key that signifies the option result to display in the parent column
  # this is signified by the only value with a title. It uses the key for that value to create the option.
  # Then it iterates over each hash and produces a column for it. Each column's parent is the previously
  # mentioned option
  def process_hash_options(hash_array, column_model, generator)
    hash_array.each do |hash|
      option = create_root_option_for_hash_options(hash, column_model)
      hash.each do |key, value|
        process_column(key, value, option, generator)
      end
    end
  end

  # Search for a value with a title attribute. Use the key for that value
  # to produce an option record.
  def create_root_option_for_hash_options(hash, column_model)
    hash.each do |key, value|
      return column_model.options.create!(text: key_to_title_string(key)) if value[:title] || hash.length == 1
    end
    raise StandardError, "#{column_model.name} has an option hash where no value has a title"
  end

  # Array options are either a set of options that need to exclude each other
  # or an option and its weight. Pass the option info to the relevant handler
  def process_array_options(options, column_model)
    options.each do |option_array|
      if option_array[1].is_a? Numeric
        process_weighted_options(option_array[0], option_array[1], column_model)
      else
        process_exclusive_options(option_array, column_model)
      end
    end
  end

  # Produces an option with a weight. Will also convert the column into a weighted column.
  def process_weighted_options(option, weight, column_model)
    column_model.options.create!(text: option, weight: weight)
  end

  # Creates options for all option strings in the array and then
  # make sure they all exclude each other
  def process_exclusive_options(options_array, column_model)
    options = column_model.create_options(options_array)
    column_model.exclusion_sets.create!(options: options)
  end

  def key_to_title_string(key)
    key.to_s.titleize
  end

  def create_column_params(key, params)
    type = params[:stats_column].present? ? 'Column::Stats' : 'Column::Options'

    column_param_hash = {
      name:                    params[:title] || key_to_title_string(key),
      help:                    params[:help],
      spoilers:                params[:spoilers],
      type:                    type,
      allow_duplicate_options: params[:allow_duplicate_options],
      chance_of_multiple:      params[:chance_of_multiple],
    }.delete_if { |_k, v| v.nil? }

    column_param_hash[:min] =     calculate_min(params)
    column_param_hash[:max] =     calculate_max(params, column_param_hash)
    column_param_hash[:max_per] = calculate_max_per(params, column_param_hash)
    column_param_hash
  end

  def calculate_min(params)
    return params[:min] if params[:min]

    1
  end

  def calculate_max(params, calculated_params)
    return params[:max] if params[:max] && params[:max] >= calculated_params[:min]

    calculated_params[:min]
  end

  def calculate_max_per(params, calculated_params)
    return params[:max_per] if params[:max_per] && params[:max_per] > calculated_params[:min]

    calculated_params[:min] + 1
  end
end
