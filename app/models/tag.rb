class Tag < ActiveRecord::Base
  has_and_belongs_to_many :users
  belongs_to :taggable, polymorphic: true

  scope :most_popular, ->() do
    joins('LEFT OUTER JOIN tags_users ON tags.id = tags_users.tag_id')
      .select('tags.id, tags.name, count(tags_users.user_id) as users_count')
      .group('tags.id, tags.name')
      .order('users_count DESC')
  end

  validates :name, presence: true, uniqueness: true
end
