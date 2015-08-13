module Fletcher
  class Search::SearchBase
    def initialize(attribute, terms)
      @attribute = attribute
      @terms = terms
      @results = results
    end

    def results
      @results ||= search_by(@attribute, @terms) || []
    end

    private

    def search_by(attribute, terms)
      ((@search_by ||= build_search_by)[attribute]).call(terms)
    end

    # to be overridden
    def build_search_by
      default_search_by = Hash.new(lambda { |terms| [] } ).with_indifferent_access
    end
  end
end
