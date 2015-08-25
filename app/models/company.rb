class Company < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :products
  has_many :tag_taggables, as: :taggable
  has_many :tags, through: :tag_taggables

  include Avatarable
  include SearchableByNameAndDescription
  include SearchableByTag

  validates :name, presence: true, uniqueness: { case_sensitive: false }

  pg_search_scope :search_by_name_and_description, :against => [
                                                     [:name, 'A'],
                                                     [:description, 'B']
                                                 ], :using => {
                                                     :tsearch => {:any_word => true, :prefix => true},
                                                     :dmetaphone => {:any_word => true, :sort_only => true}
                                                 }

  pg_search_scope :search_by_name, :against => :name, :using => {
                                     :tsearch => {:any_word => true, :prefix => true},
                                     :dmetaphone => {:any_word => true, :sort_only => true}
                                 }

  pg_search_scope :search_by_description, :against => :description, :using => {
                                            :tsearch => {:any_word => true, :prefix => true},
                                            :dmetaphone => {:any_word => true, :sort_only => true}
                                        }

  def image_url
    avatar.try(:url)
  end

  def short_desc
    description.split[0...9].join(' ') if description
  end
end
