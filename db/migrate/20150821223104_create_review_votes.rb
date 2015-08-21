class CreateReviewVotes < ActiveRecord::Migration
  def change
    create_table :review_votes do |t|
      t.belongs_to :review, foreign_key: true
      t.belongs_to :user, foreign_key: true
      t.boolean :helpful
      t.timestamps null: false
    end
  end
end
