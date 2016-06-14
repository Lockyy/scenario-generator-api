json.(column, :id, :name, :min, :max, :chance_of_multiple, :max_per, :allow_duplicate_options, :type)
json.options column.options, partial: 'api/v1/generators/option', as: :option

json.exclusion_sets column.exclusion_sets do |exclusion_set|
  json.array! exclusion_set.options.map(&:id)
end

json.columns column.columns, partial: 'api/v1/generators/column', as: :column
