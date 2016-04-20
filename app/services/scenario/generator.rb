module Scenario
  class Generator
    def initialize(generator_id)
      @generator = ::Generator.find_by(id: generator_id)
    end

    def generate_scenario
      process_column(@generator.column)
    end

    private

    # Recursively generate a scenario using the passed in column
    def process_column(column)
      columns = []

      # Add the current column and it's opens to the array
      options = column.pick
      columns << {
        column: column,
        options: options
      }

      # If the options we picked have columns then we need to recursively add their columns to the array
      # Doing it here ensures that it appears in the correct place in the scenario
      options.each do |option|
        option.columns.each do |column|
          columns += process_column(column)
        end
      end

      # If this column has any child columns, recursively add them to the array as well
      column.columns.each do |column|
        columns += process_column(column)
      end

      return columns
    end
  end
end
