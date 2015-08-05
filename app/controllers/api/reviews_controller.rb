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

    def index
      @product = Product.find_by(id: params[:product_id])
      @reviews = @product.reviews

      respond_to do |format|
        format.json { render }
      end
    end
  end
end
