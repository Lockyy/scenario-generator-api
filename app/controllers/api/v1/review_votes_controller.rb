class Api::V1::ReviewVotesController < AppController
  before_action :set_product, only: [:create]
  before_action :set_review, only: [:create]

  def create
    review_vote = Fletcher::CreateReviewVote.new(current_user, @review, vote_params)
    respond_to do |format|
      review_vote.save!
      @review_vote = review_vote.review_vote
      if @review_vote.valid?
        url = api_v1_product_review_review_votes_url(@product, @review, @review_vote)
        format.json { render 'api/v1/reviews/review_votes/show', status: :created, location: url }
      else
        format.json { render json: @review_vote.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
  end

  def destroy
    review_vote = ReviewVote.find_by(review_id: params[:review_id],
                                     user_id:   current_user.id)
    review_vote.destroy if review_vote

    respond_to do |format|
      format.json { render 'api/v1/reviews/review_votes/destroy' }
    end
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
