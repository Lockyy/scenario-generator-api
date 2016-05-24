json.(column, :id, :name, :min, :max, :chance_of_multiple, :max_per, :allow_duplicate_options, :type)
json.options column.options, partial: 'api/v1/generators/option', as: :option
json.exclusions column.exclusion_array
json.columns column.columns, partial: 'api/v1/generators/column', as: :column
