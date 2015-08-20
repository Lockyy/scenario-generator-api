module Fletcher
  class Search::SearchTags < Search::SearchBase
    def initialize(attribute, terms, sort_description, filter_tags)
      super(attribute, terms, sort_description, filter_tags)
    end

    private

    def obtain_related_tags(data)
      @related_tags ||= data
    end

    def filter_by_tags(filter_tags, data)
      data
    end

    def build_search_by
      default_search_by = Hash.new(lambda { |terms|
        Tag.search_by_name(terms.join(' '))
      }).with_indifferent_access
    end
  end
end
