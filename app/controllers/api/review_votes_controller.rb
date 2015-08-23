module Api
  class ReviewVotesController < AppController
    before_action :set_product, only: [:create]
    before_action :set_review, only: [:create]
    
    def create
      review_vote = Fletcher::CreateReviewVote.new(current_user, @review, vote_params)
      respond_to do |format|
        review_vote.save!
        @review_vote = review_vote.review_vote
        if @review_vote.valid?
          url = api_product_review_review_votes_url(@product, @review, @review_vote)
          format.json { render 'api/reviews/review_votes/show', status: :created, location: url }
        else
          format.json { render json: @review_vote.errors, status: :unprocessable_entity }
        end
      end
    end

    def show
    end

    private

    def set_product
      @product = Product.find(vote_params[:product_id])
    end

    def set_review
      @review = Review.find(vote_params[:review_id])
    end
    
    def vote_params
      params.permit(:product_id, :review_id, :helpful)
    end
  end
end
