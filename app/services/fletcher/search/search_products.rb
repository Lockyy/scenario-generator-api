module Fletcher
  class Search::SearchProducts < Search::SearchBase
    def initialize(attribute, terms)
      super(attribute, terms)
    end

    private

    def build_search_by
      default_search_by = Hash.new(lambda { |terms|
        Product.where { (name.like_any(terms)) | (description.like_any(terms)) }
      }).with_indifferent_access

      default_search_by[:name] = lambda { |terms| Product.where { (name.like_any(terms)) } }
      default_search_by[:description] = lambda { |terms| Product.where { (description.like_any(terms)) } }
      default_search_by
    end
  end
end
