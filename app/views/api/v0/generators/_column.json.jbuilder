json.name column[:name]
json.options column[:options], :text
json.columns column[:child_columns], partial: 'api/v0/generators/column', as: :column