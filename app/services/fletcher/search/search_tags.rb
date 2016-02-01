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
      default_search_by = Hash.new(lambda { |terms| Tag.with_products.where { (name.like_any(terms)) } }).with_indifferent_access
    end

    def build_sort_by
      default_sort_by = super
      default_sort_by[:relevance] = lambda { |data| data }
      default_sort_by[:latest] = lambda { |data| data.reorder('created_at ASC') }
      default_sort_by[:alphabetical_order] = lambda { |data| data.reorder('LOWER(name) ASC') }
      default_sort_by
    end
  end
end
