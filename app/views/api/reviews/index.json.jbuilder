json.array!(@api_reviews) do |api_review|
  json.extract! api_review, :id
  json.url api_review_url(api_review, format: :json)
end
