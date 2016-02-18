json.extract! @user, :id

json.recent_activity @recent_activity, :id, :created_at, :user do |recent_activity|
  json.extract! recent_activity, :id, :title, :quality_review, :quality_score, :price_review,
    :price_score, :attachments, :links, :created_at, :updated_at, :tags

  json.product recent_activity.product, :id, :name, :description, :url, :company, :created_at, :slug
end
