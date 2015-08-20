module SearchableByTag
  extend ActiveSupport::Concern
  included do
    include PgSearch

    pg_search_scope :with_tags,
      :associated_against => {
          :tags => [:name]
      }, :using => {
          :tsearch => {:any_word => true}
      }
  end
end


