class Review < ActiveRecord::Base
  belongs_to :reviewable, polymorphic: true
  belongs_to :user
  has_many :attachments, as: :attachable
  has_many :tags, as: :taggable
  has_many :links

  def display_date
    created_at.strftime('%b %e, %Y')
  end

  # TODO: implement custom validator(validate presence of at least one of the fields)
end
