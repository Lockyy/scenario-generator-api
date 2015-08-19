module SearchableByNameAndDescription
  extend ActiveSupport::Concern
  included do
    include PgSearch

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
  end
end
