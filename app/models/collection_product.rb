class CollectionProduct < ActiveRecord::Base
  belongs_to :collection, touch: true
  belongs_to :product
  belongs_to :user

  validates :collection_id, uniqueness: { scope: :product_id }
  validates :collection, presence: true
  validates :product, presence: true

  def display_date
    created_at.strftime('%b %e, %Y')
  end
end
