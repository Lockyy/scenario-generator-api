class Link < ActiveRecord::Base
  belongs_to :review

  validates :url, presence: true

  def author
    review.user
  end
end
