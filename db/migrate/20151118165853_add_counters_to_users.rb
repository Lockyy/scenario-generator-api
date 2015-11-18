class AddCountersToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :total_reviews, :integer, :null => false, :default => 0
    add_column :users, :total_products, :integer, :null => false, :default => 0
    add_column :users, :total_attachments, :integer, :null => false, :default => 0]

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
