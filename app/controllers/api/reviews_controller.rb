module Api
  class ReviewsController < AppController
    before_action :set_review, only: [:show, :update, :destroy]

    # GET /reviews
    # GET /reviews.json
    def index
      @product = Product.find_by(id: params[:product_id])
      @reviews = @product.reviews

      respond_to do |format|
        format.json { render }
      end
    end

    # GET /reviews/1
    # GET /reviews/1.json
    def show
    end

    # POST /reviews
    # POST /reviews.json
    def create
      review = Fletcher::NewReview.new(@user, review_params)

      respond_to do |format|
        if (review.save!)
          @review = review.review
          format.json { render :show, status: :created, location: api_review_url(@review) }
        else
          format.json { render json: review.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /reviews/1
    # PATCH/PUT /reviews/1.json
    def update
      respond_to do |format|
        if @review.update(review_params)
          format.json { render :show, status: :ok, location: @review }
        else
          format.json { render json: @review.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /reviews/1
    # DELETE /reviews/1.json
    def destroy
      @review.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_review
      @review = Review.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def review_params
      params[:review].permit(
          :quality_score, :quality_review, :title, :price_review, :price_score,
          { attachments: [:name, :url, :content_type, :size] },
          { product: [:name, { company: [:name] }, :url, :description] }
      )
    end
  end
end
