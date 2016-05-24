json.(option, :id, :text, :weight)
json.columns option.columns, partial: 'api/v1/generators/column', as: :column
