json.type type

json.items data, :id, :created_at, :user do |recent_activity|
  json.extract! recent_activity, :id, :title, :quality_review, :quality_score, :price_review,
    :price_score, :attachments, :links, :created_at, :updated_at, :tags, :review_votes, :user

  json.attachments recent_activity.attachments do |attachment|
    json.extract! attachment, :id, :attachable_id, :attachable_type, :name,
      :content_type, :size, :created_at, :updated_at, :product_id, :author

    json.url attachment_asset_path(id: attachment.id)
  end

  json.product recent_activity.product, :id, :name, :description, :url, :company, :created_at, :slug
end
