json.(option, :id, :text)
json.weight option.weight if option.weight
json.columns option.columns.old_to_new, partial: 'api/v1/generators/column', as: :column
json.exclusive_options (option.excluded_options - [option]).map(&:id)
