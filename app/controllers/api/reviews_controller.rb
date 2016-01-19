module Api
  class ReviewsController < AppController
    before_action :set_product, only: [:index, :create, :show, :update]

    # GET /reviews
    # GET /reviews.json
    def index
      @reviews = @product.reviews.sorted(params[:sorting])

      respond_to do |format|
        format.json { render }
      end
    end

    # GET /reviews/1
    # GET /reviews/1.json
    def show
      @review = @product.reviews.find(params[:id])

      respond_to do |format|
        format.json { render }
      end
    end

    # POST /reviews
    # POST /reviews.json
    def create
      review = Fletcher::NewReview.new(current_user, @product, create_params)

      respond_to do |format|
        if (review.save!)
          @review = review.review
          product = review.product
          userName = review.review.user.name
          message = "The user #{userName} has just created a new review for the product '#{product.name}' with the title '#{@review.title}' you can see it at: #{request.base_url}/app/products/#{product.id}/#{product.slug}"
          Slacked.post_async(message)
          format.json { render :show, status: :created, location: api_review_url(@review) }
        else
          format.json { render json: review.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /reviews/1
    # PATCH/PUT /reviews/1.json
    def update
      @review = current_user.reviews.find(params[:id])
      review = Fletcher::UpdateReview.new(@review, review_params)

      respond_to do |format|
        if review.save!
          format.json { render :show, status: :ok, location: api_review_url(@review) }
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

    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.friendly.find(params[:product_id]) if params[:product_id]
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def review_params
      params[:review].permit(
          :id, :quality_score, :quality_review, :title, :price_review, :price_score,
          :attachable_id, :attachable_type,
          {attachments: [:name, :url, :content_type, :size, :id]},
          {links: [:url, :id]},
          {tags: [:name, :id]},
          {product: [:id, :name, {company: [:name, :id]}, :url, :description]}
      )
    end

    def create_params
      params[:review].permit(
          :id, :quality_score, :quality_review, :title, :price_review, :price_score,
          :attachable_id, :attachable_type,
          {attachments: [:name, :url, :content_type, :size, :id]},
          {links: [:url, :id]},
          {tags: [:name, :id]},
          {product: [:id, :name, :url, :description,
                     {company: [:name, :id, :tags, :url, :description,
                                {tags: [:name, :id]},
                                {avatar: [:name, :url, :content_type, :size]}]
                     }]
          }
      )
    end
  end
end
