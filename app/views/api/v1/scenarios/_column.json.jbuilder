json.(column[:column], :id, :name, :help)
json.options column[:options], partial: 'api/v1/scenarios/option', as: :option
json.columns column[:child_columns], partial: 'api/v1/scenarios/column', as: :column