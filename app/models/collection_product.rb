class CollectionProduct < ActiveRecord::Base

  belongs_to :collection
  belongs_to :product
  belongs_to :user

  validates :collection_id, uniqueness: { scope: :product_id }

  def display_date
    created_at.strftime('%b %e, %Y')
  end

end
