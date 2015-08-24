class AddCachedHelpfulnessToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :cached_helpfulness, :integer
  end
end
