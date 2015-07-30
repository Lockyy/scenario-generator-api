module Api
  class ReviewsController < AppController
    def create
      review = Fletcher::NewReview.new(params)

      if (review.save!)
        render nothing: true
      else
        render json: review.errors, status: :unprocessable_entity
      end
    end
  end
end
