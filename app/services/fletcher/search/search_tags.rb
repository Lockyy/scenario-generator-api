module Fletcher
  class Search::SearchTags < Search::SearchBase
    def initialize(attribute, terms)
      super(attribute, terms)
    end

    private

    def build_search_by
      default_search_by = Hash.new(lambda { |terms|
        Tag.where { (name.like_any(terms)) }
      }).with_indifferent_access
    end
  end
end
