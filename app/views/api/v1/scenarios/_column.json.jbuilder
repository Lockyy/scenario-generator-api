json.(column[:column], :id, :name, :help)
json.options column[:options], :id, :text
json.columns column[:child_columns], partial: 'api/v1/scenarios/column', as: :column