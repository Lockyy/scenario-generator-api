class Tag < ActiveRecord::Base
  include PgSearch

  has_and_belongs_to_many :users

  has_many :tag_taggables
  has_many :products, :through => :tag_taggables, :source => :taggable, :source_type => 'Product'
  has_many :companies, :through => :tag_taggables, :source => :taggable, :source_type => 'Company'

  pg_search_scope :search_by_name, :against => :name, :using => {
                                     :tsearch => {:any_word => true, :prefix => true},
                                     :dmetaphone => {:any_word => true, :sort_only => true},
                                     :trigram => { :threshold => 0.1 }
                                 }

  scope :most_popular, ->() do
    joins('LEFT OUTER JOIN tags_users ON tags.id = tags_users.tag_id')
      .select('tags.id, tags.name, count(tags_users.user_id) as users_count')
      .group('tags.id, tags.name')
      .order('users_count DESC')
  end

  validates :name, presence: true, uniqueness: true
end
