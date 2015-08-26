module Fletcher
  class Search::SearchTags < Search::SearchBase
    def initialize(attribute, terms, sort_description, filter_tags, match_mode)
      super(attribute, terms, sort_description, filter_tags, match_mode)
    end

    private

    def obtain_related_tags(data)
      @related_tags ||= data
    end

    def filter_by_tags(filter_tags, data)
      data
    end

    def build_search_by
      default_search_by = Hash.new(lambda { |terms| Tag.where { (name.like_any(terms)) } }).with_indifferent_access
    end
  end
end
