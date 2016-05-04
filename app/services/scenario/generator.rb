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
  end
end
