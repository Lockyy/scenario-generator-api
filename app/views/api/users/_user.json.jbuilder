json.extract! @user, :id, :name, :department, :job_title, :avatar_url, :location, :total_reviews, :reviews,
  :total_attachments, :tags

json.recent_activity @user.recent_activity.limit(4), :id, :created_at, :user do |recent_activity|
  json.extract! recent_activity, :id, :title, :quality_review, :quality_score, :price_review,
    :price_score, :attachments, :links, :created_at, :updated_at, :tag_list, :tags, :reviewVotes

  json.reviewable recent_activity.reviewable, :id, :name, :description, :url, :company, :created_at
end
