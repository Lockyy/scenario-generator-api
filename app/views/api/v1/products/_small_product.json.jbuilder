json.name product.name
json.(product,  :id, :name, :description, :rating,
                :created_at, :updated_at, :author, :short_desc, :slug)

json.reviews product.reviews do |review|
  json.extract! review, :id, :title, :quality_review, :quality_score,
                        :price_review, :price_score, :created_at, :updated_at,
                        :review_votes, :helpful_votes, :total_votes, :display_date
end