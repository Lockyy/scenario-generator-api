class ReviewVote < ActiveRecord::Base
  belongs_to :review
  belongs_to :user
  counter_culture :review, column_name: 'total_votes'
  counter_culture :review, column_name: 'helpful_votes', delta_column: 'helpful'

  validates :review, uniqueness: { scope: :user }

  scope :helpful, -> do
    where(helpful: 1)
  end

  scope :unhelpful, -> do
    where(helpful: 0)
  end
end
