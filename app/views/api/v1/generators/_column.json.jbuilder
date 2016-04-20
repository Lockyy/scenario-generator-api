json.(column, :id, :name, :min, :max, :chance_of_multiple)
json.options column.options, partial: 'api/v1/generators/option', as: :option
json.columns column.columns, partial: 'api/v1/generators/column', as: :column
