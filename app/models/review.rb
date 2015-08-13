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

  validates :quality_score, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }, allow_nil: true
  validates :price_score, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }, allow_nil: true
  validate :has_at_least_one_field

  private

  def has_at_least_one_field
    invalid_title = title.nil? || title.empty?
    invalid_quality_review = quality_review.nil? || quality_review.empty?
    invalid_quality_score = quality_score.nil?
    invalid_price_review = price_review.nil? || price_review.empty?
    invalid_price_score = price_score.nil?
    invalid_attachments = attachments.nil? || attachments.empty?
    invalid_tags = tags.nil? || tags.empty?
    invalid_links = links.nil? || links.empty?

    if invalid_title && invalid_quality_review && invalid_quality_score && invalid_price_review && invalid_price_score &&
      invalid_attachments && invalid_tags && invalid_links

      errors.add(:review, "at least one field is required")
    end
  end
end
