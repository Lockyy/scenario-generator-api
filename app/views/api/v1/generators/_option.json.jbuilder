json.(option, :id, :text)
json.columns option.columns, partial: 'api/v1/generators/column', as: :column
