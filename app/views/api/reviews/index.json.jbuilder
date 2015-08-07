json.product_id @product.id
json.reviews @reviews do |review|
  json.(review, :title, :quality_review, :quality_score, :price_review, :price_score, :tag_list, :attachments, :links, :display_date, :created_at)
  json.user do
    json.(review.user, :name, :job_title, :avatar_url, :location, :total_reviews)
  end unless review.user.nil?
end
