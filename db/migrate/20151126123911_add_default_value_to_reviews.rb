class AddDefaultValueToReviews < ActiveRecord::Migration
  def up
    change_column :reviews, :price_score, :integer, :default => 0
    change_column :reviews, :quality_score, :integer, :default => 0
    change_column :reviews, :helpful_votes, :integer, :default => 0
    change_column :reviews, :total_votes, :integer, :default => 0
  end

  def down
    change_column :reviews, :price_score, :integer, :default => nil
    change_column :reviews, :quality_score, :integer, :default => nil
    change_column :reviews, :helpful_votes, :integer, :default => nil
    change_column :reviews, :total_votes, :integer, :default => nil
  end
end
