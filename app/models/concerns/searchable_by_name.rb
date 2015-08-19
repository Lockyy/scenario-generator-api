module SearchableByName
  extend ActiveSupport::Concern
  included do
    include PgSearch

    pg_search_scope :search_by_name, :against => :name, :using => {
      :tsearch => {:any_word => true, :prefix => true},
      :dmetaphone => {:any_word => true, :sort_only => true},
      :trigram => {:threshold => 0.1}
    }
  end
end
