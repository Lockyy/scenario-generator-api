module Fletcher
  class Search::SearchTags < Search::SearchBase
    def initialize(attribute, terms, sort_description)
      super(attribute, terms, sort_description)
    end

    private

    def build_search_by
      default_search_by = Hash.new(lambda { |terms|
        Tag.search_by_name(terms.join(' '))
      }).with_indifferent_access
    end
  end
end
