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
      @review_vote = ReviewVote.new({review: @review, user: @user, helpful: @is_helpful})
      @review.reviewVotes << @review_vote
      @review.save!
    end
  end
end
