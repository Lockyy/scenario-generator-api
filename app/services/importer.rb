class Importer
  def process(generator_key, generator_hash)
    @generator_key = generator_key
    @generator_hash = generator_hash
    process_generator
  end

  private

  # Creates subject and generator records and then iterates over columns
  # to produce column records
  # Returns generator
  def process_generator
    @subject = Subject.create({
      name: @generator_hash[:title],
      ad_link: @generator_hash[:buy_link],
    })
    @generator = @subject.generators.create({
      name: @generator_hash[:generator_title],
    })

    @generator_hash[:columns].each do |column_key, column_hash|
      process_column(column_key, column_hash, @generator)
    end
    @generator
  end

  # Produces hash of params and then creates column
  # Uses process_options to create options and their sub-columns
  def process_column(column_key, column_hash, parent)
    column_params = create_column_params(column_key, column_hash)
    column = parent.columns.create(column_params)
    byebug unless column.persisted?
    process_options(column_hash[:options], column)
    column
  end

  # Groups options by type and then passes them along to the relevant processing function
  def process_options(options_array, column_model)
    options = []
    option_types = options_array.group_by { |option| option.class }
    option_types.each do |type, options|
      case type.name
      when 'Symbol'
        options += column_model.create_options(options)
      when 'Hash'
        options += process_hash_options(options, column_model)
      when 'Array'
        options += process_array_options(options, column_model)
      end
    end
    options
  end

  # This is for processing options with sub-columns
  # First it looks for the key that signifies the option result to display in the parent column
  # this is signified by the only value with a title. It uses the key for that value to create the option.
  # Then it iterates over each hash and produces a column for it. Each column's parent is the previously
  # mentioned option
  def process_hash_options(hash_array, column_model)
    hash_array.each do |hash|
      columns = []
      option = create_root_option_for_hash_options(hash, column_model)
      hash.each do |key, value|
        process_column(key, value, option)
      end
    end
  end

  # Search for a value with a title attribute. Use the key for that value
  # to produce an option record.
  def create_root_option_for_hash_options(hash, column_model)
    hash.each do |key, value|
      return column_model.options.create(text: key_to_string(key)) if value[:title] || hash.length == 1
    end
    byebug
    raise StandardError, "#{column_model.name} has an option hash where no value has a title"
  end

  # Array options are either a set of options that need to exclude each other
  # or an option and its weight. Pass the option info to the relevant handler
  def process_array_options(options, column_model)
    options.each do |option_array|
      if(option_array[1].is_a? Numeric)
        process_weighted_options(option_array[0], option_array[1], column_model)
      else
        process_exclusive_options(option_array, column_model)
      end
    end
  end

  # Produces an option with a weight. Will also convert the column into a weighted column.
  def process_weighted_options(option, weight, column_model)
    column_model.options.create(text: option, weight: weight)
  end

  # Creates options for all option strings in the array and then
  # make sure they all exclude each other
  def process_exclusive_options(options_array, column_model)
    options = column_model.create_options(options_array)
    options.each_with_index do |option, index|
      options[(index + 1)..-1].each do |exclusive_option|
        OptionExclusion.create(left_option: option, right_option: exclusive_option)
      end
    end
  end

  def key_to_string(key)
    key.to_s.titleize
  end

  def create_column_params(key, params)
    column_param_hash = {
      min:                     params[:min],
      max:                     params[:max] || params[:min],
      max_per:                 params[:max_per] || (params[:min] + 1),
      allow_duplicate_options: params[:allow_duplicate_options],
      name:                    params[:title] || key_to_string(key),
      help:                    params[:help],
      spoilers:                params[:spoilers],
      type:                    params[:type],
    }.delete_if { |k, v| v.nil? }
    # This ensures that it'll default to zero as per the database schema if none is set
    column_param_hash[:chance_of_multiple] = params[:chance_of_multiple] if params[:chance_of_multiple]
    column_param_hash
  end
end