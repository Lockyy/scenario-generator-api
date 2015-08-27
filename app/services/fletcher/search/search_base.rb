module Fletcher
  class Search::SearchBase
    def initialize(attribute, terms, sort_description, filter_tags, match_mode)
      @attribute = attribute
      @terms = terms
      @sort_description = sort_description ? sort_description.to_sym: sort_description
      @filter_tags = filter_tags
      @match_mode = match_mode || 'any'
      @results = results
    end

    def results
      @results ||= search_by(@attribute, @terms) || []
      @related_tags ||= obtain_related_tags(@results)
      @filtered_results_by_tags = filter_by_tags(@filter_tags, @results)
      sort_by(@sort_description, @filtered_results_by_tags)
    end

    def related_tags
      @related_tags ||= obtain_related_tags(@results)
    end

    private

    def obtain_related_tags(data)
      @related_tags ||= data.map(&:tags).flatten.uniq
    end

    def filter_by_tags(filter_tags, data)
      return data if filter_tags.empty?

      data.with_tags(filter_tags.map(&:name))
    end

    def search_by(attribute, terms)
      ((@search_by ||= build_search_by)[attribute]).call(terms)
    end

    # to be overridden
    def build_search_by
      default_search_by = Hash.new(lambda { |terms| [] } ).with_indifferent_access
    end

    def sort_by(sort_description, data)
      ((@sort_by ||= build_sort_by)[sort_description]).call(data)
    end

    # to be overridden
    def build_sort_by
      default_sort_by = Hash.new(lambda { |data| data.order(name: :asc) } ).with_indifferent_access
    end
  end
end
