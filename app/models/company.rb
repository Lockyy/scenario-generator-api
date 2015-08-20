class Company < ActiveRecord::Base
  has_many :products
  has_many :tag_taggables, as: :taggable
  has_many :tags, through: :tag_taggables

  include Avatarable
  include SearchableByNameAndDescription
  include SearchableByTag

  before_save :downcase_name

  validates :name, presence: true, uniqueness: true

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

  private

  def downcase_name
    self.name = self.name.downcase
  end
end
