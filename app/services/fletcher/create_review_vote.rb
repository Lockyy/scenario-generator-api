module Fletcher
  class CreateReviewVote
    attr_reader :review_vote

    def initialize(user, review, params)
      @review = review
      @user = user
      @is_helpful = params[:helpful]
      @params = params
    end

    def save!
      @review_vote = ReviewVote.find_or_initialize_by({review: @review, user: @user})
      @review_vote.helpful = @is_helpful
      @review_vote.save
      @review.save!
    end
  end
end
