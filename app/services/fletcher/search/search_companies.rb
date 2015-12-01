module Fletcher
  class Search::SearchCompanies < Search::SearchBase
    def initialize(attribute, terms, sort_description, filter_tags, match_mode)
      super(attribute, terms, sort_description, filter_tags, match_mode)
    end

    private

    def search_by(attribute, terms)
      simple_search = @match_mode == 'all'
      @search_by = simple_search ? build_search_by : build_full_text_search_by
      @search_by[attribute].call(terms)
    end


    def build_full_text_search_by
      default_search_by = Hash.new(lambda { |terms|
        ::Company.search_by_name_and_description(terms.join(' '))
      }).with_indifferent_access

      default_search_by[:name] = lambda { |terms| ::Company.search_by_name(terms.join(' ')) }
      default_search_by[:description] = lambda { |terms| ::Company.search_by_description(terms.join(' ')) }
      default_search_by
    end

    def build_search_by
      default_search_by = Hash.new(lambda { |terms|
        ::Company.where { (name.like_any(terms)) | (description.like_any(terms)) }
      }).with_indifferent_access

      default_search_by[:name] = lambda { |terms| ::Company.where { (name.like_any(terms)) } }
      default_search_by[:description] = lambda { |terms| ::Company.where { (description.like_any(terms)) } }
      default_search_by
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
