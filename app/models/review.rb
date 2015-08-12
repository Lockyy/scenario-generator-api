class Review < ActiveRecord::Base
  belongs_to :reviewable, polymorphic: true
  belongs_to :user
  has_many :attachments, as: :attachable
  has_many :tags, as: :taggable
  has_many :links

  accepts_nested_attributes_for :tags
  accepts_nested_attributes_for :links, allow_destroy: true

  def display_date
    created_at.strftime('%b %e, %Y')
  end

  def tag_list
    self.tags.map(&:name)
  end

  def formatted_quality_review
    (quality_review.nil? or quality_review.empty?) ? "" : ApplicationController.helpers.simple_format(quality_review)
  end

  # TODO: implement custom validator(validate presence of at least one of the fields)
end
