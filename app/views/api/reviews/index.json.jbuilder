json.product_id @product.id
json.reviews @product.reviews, partial: 'api/reviews/review', as: :review
