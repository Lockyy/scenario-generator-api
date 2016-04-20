json.(column[:column], :id, :name)
json.options column[:options], partial: 'api/v1/scenarios/option', as: :option