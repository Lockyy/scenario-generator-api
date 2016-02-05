json.letter tag_group[0]
json.total tag_group[1].size
json.tags tag_group[1], partial: 'api/v1/tags/tag', as: :tag