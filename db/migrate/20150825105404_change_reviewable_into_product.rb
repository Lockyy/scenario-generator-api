class ChangeReviewableIntoProduct < ActiveRecord::Migration
  def change
    rename_column :reviews, :reviewable_id, :product_id
    remove_column :reviews, :reviewable_type, :string
  end
end
