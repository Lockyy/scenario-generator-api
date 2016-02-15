module Fletcher
  class Search::SearchProducts < Search::SearchBase
    SORT_FIELDS_SIMPLE_SEARCH = [:high_to_low, :low_to_high].freeze

    def initialize(attribute, terms, sort_description, filter_tags, match_mode)
      super(attribute, terms, sort_description, filter_tags, match_mode)
    end

    private

    def obtain_related_tags(data)
      @related_tags ||= Tag
                        .joins(:reviews)
                        .where(reviews: { product_id: data.map(&:id) }).uniq
    end

    def search_by(attribute, terms)
      simple_search = SORT_FIELDS_SIMPLE_SEARCH.include?(@sort_description) || @match_mode == 'all'
      @search_by = simple_search ? build_search_by : build_full_text_search_by
      @search_by[attribute].call(terms)
    end

    def build_full_text_search_by
      default_search_by = Hash.new(-> (terms) {
        Product.search_by_name_and_description(terms.join(' '))
      }).with_indifferent_access

      default_search_by[:name] = ->(terms) { Product.search_by_name(terms.join(' ')) }
      default_search_by[:description] = ->(terms) { Product.search_by_description(terms.join(' ')) }
      default_search_by
    end

    def build_search_by
      default_search_by = Hash.new(-> (terms) {
        Product.where { name.like_any(terms) | description.like_any(terms) }
      }).with_indifferent_access

      default_search_by[:name] = ->(terms) { Product.where { name.like_any(terms) } }
      default_search_by[:description] = ->(terms) { Product.where { description.like_any(terms) } }
      default_search_by
    end

    def build_sort_by
      default_sort_by = super
      default_sort_by[:relevance] = ->(data) { data }
      default_sort_by[:latest] = ->(data) { data.reorder('created_at ASC') }
      default_sort_by[:alphabetical_order] = ->(data) { data.alphabetical }
      default_sort_by[:high_to_low] = ->(data) { data.best_rating }
      default_sort_by[:low_to_high] = ->(data) { data.worst_rating }
      default_sort_by
    end
  end
end
