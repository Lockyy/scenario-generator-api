module Fletcher
  class Search::SearchCompanies < Search::SearchBase
    def initialize(attribute, terms, sort_description, filter_tags)
      super(attribute, terms, sort_description, filter_tags)
    end

    private

    def build_search_by
      default_search_by = Hash.new(lambda { |terms|
                                     Company.search_by_name_and_description(terms.join(' '))
                                   }).with_indifferent_access

      default_search_by[:name] = lambda { |terms| Company.search_by_name(terms.join(' ')) }
      default_search_by[:description] = lambda { |terms| Company.search_by_description(terms.join(' ')) }
      default_search_by
    end
  end
end
