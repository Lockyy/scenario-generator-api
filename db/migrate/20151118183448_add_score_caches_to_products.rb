class AddScoreCachesToProducts < ActiveRecord::Migration
  def change
    add_column :products, :quality_score_cache, :float
    add_column :products, :price_score_cache, :float
    add_column :products, :total_reviews, :integer, :null => false, :default => 0

    Product.find_each(&:save)
    Review.counter_culture_fix_counts
  end
end
