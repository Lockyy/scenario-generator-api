json.type type

json.items data, :id, :created_at, :user do |recent_activity|
  json.extract! recent_activity, :id, :title, :quality_review, :quality_score, :price_review,
    :price_score, :attachments, :links, :created_at, :updated_at, :tag_list, :tags, :review_votes, :user

  json.product recent_activity.product, :id, :name, :description, :url, :company, :created_at
end
