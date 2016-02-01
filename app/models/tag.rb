class Tag < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  include SearchableByName

  has_and_belongs_to_many :users
  has_many :tag_taggables
  has_many :reviews, through: :tag_taggables, :source => :taggable, :source_type => 'Review'
  has_many :products, through: :reviews
  has_many :companies, through: :reviews

  scope :most_popular, ->() do
    joins(:tag_taggables)
      .select('tags.id, tags.name, tags.slug, count(tag_taggables.taggable_id) as taggables_count')
      .group('tags.id, tags.name')
      .order('taggables_count DESC')
  end

  scope :random, ->() do
    order('RANDOM()')
  end

  scope :with_products, ->() do
    where { tag_taggables_count > 0 }
  end

  default_scope { where.not(tag_taggables_count: 0) }

  before_validation :downcase_name!

  validates :name, presence: true, uniqueness: true

  def should_generate_new_friendly_id?
    true
  end

  def follow(user)
    users.append user
  end

  def unfollow(user)
    users.delete user
  end

  def followed?(user)
    users.include? user
  end

  private

  def downcase_name!
    self.name = self.name.downcase if self.name
  end
end
