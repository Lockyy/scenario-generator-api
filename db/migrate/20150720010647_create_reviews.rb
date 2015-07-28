class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :title
      t.text :quality_review
      t.integer :quality_score
      t.text :price_review
      t.integer :price_score
      t.references :reviewable, polymorphic: true, index: true

      t.timestamps null: false
    end
  end
end
