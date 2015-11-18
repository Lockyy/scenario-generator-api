class AddHelpfulnessCachingToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :helpful_votes, :integer
    add_column :reviews, :total_votes,   :integer
    change_column :review_votes, :helpful, 'integer USING CAST(helpful AS integer)'

    ReviewVote.counter_culture_fix_counts
  end
end
