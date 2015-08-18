module Fletcher
  class Search::SearchBase
    def initialize(attribute, terms, sort_description)
      @attribute = attribute
      @terms = terms
      @sort_description = sort_description
      @results = results
    end

    def results
      @results ||= search_by(@attribute, @terms) || []
      sort_by(@sort_description, @results)
    end

    private

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
