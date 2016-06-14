json.(option, :id, :text)
json.weight option.weight if option.weight
json.columns option.columns, partial: 'api/v1/generators/column', as: :column
