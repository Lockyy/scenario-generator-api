module Fletcher
  class Search::SearchProducts < Search::SearchBase
    def initialize(attribute, terms, sort_description)
      super(attribute, terms, sort_description)
    end

    private

    def sort_by(sort_description, data)
      @sort_by ||= build_sort_by
      sort_with = @sort_by[sort_description]
      sort_with.call(data)
    end

    def build_search_by
      default_search_by = Hash.new(lambda { |terms|
                                     Product.search_by_name_and_description(terms.join(' '))
                                   }).with_indifferent_access

      default_search_by[:name] = lambda { |terms| Product.search_by_name(terms.join(' ')) }
      default_search_by[:description] = lambda { |terms| Product.search_by_description(terms.join(' ')) }
      default_search_by
    end

    def build_sort_by
      default_sort_by = super
      default_sort_by[:latest] = lambda { |data| data.reorder('created_at ASC') }
      default_sort_by[:alphabetical_order] = lambda { |data| data.reorder('name ASC') }
      default_sort_by[:high_to_low] = lambda { |data| data.best_rating }
      default_sort_by[:low_to_high] = lambda { |data| data.worst_rating }
      default_sort_by
    end
  end
end
