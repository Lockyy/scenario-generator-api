class AddCountersToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :total_reviews, :integer, :null => false, :default => 0
    add_column :users, :total_products, :integer, :null => false, :default => 0
    add_column :users, :total_attachments, :integer, :null => false, :default => 0
    add_column :products, :quality_score_cache, :float
    add_column :products, :price_score_cache, :float
    add_column :products, :total_reviews, :integer, :null => false, :default => 0
    add_column :reviews, :helpful_votes, :integer
    add_column :reviews, :total_votes,   :integer
    change_column :review_votes, :helpful, 'integer USING CAST(helpful AS integer)'

    Product.find_each(&:save)
    ReviewVote.counter_culture_fix_counts
    Review.counter_culture_fix_counts
    Product.counter_culture_fix_counts
    Attachment.counter_culture_fix_counts
  end

  def self.down
    remove_column :users, :total_reviews
    remove_column :users, :total_products
    remove_column :users, :total_attachments
  end
end
