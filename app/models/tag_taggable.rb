class TagTaggable < ActiveRecord::Base
  belongs_to :tag, counter_cache: true
  belongs_to :taggable, polymorphic: true

  validates :tag_id, uniqueness: {scope: :taggable}
end
