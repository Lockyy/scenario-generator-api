json.product_id @product.id
json.reviews @reviews, partial: 'api/v1/reviews/review', as: :review
