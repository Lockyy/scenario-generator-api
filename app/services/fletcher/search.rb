module Fletcher
  class Search

    def initialize(search_string)
      @terms = get_terms(search_string || '')
    end

    def results
      {
        companies: companies(@terms),
        products: products(@terms),
        tags: tags(@terms)
      }
    end

    private

    def companies(terms)
      Company.where{ (name.like_any(terms)) | (description.like_any(terms)) } || []
    end

    def products(terms)
      Product.where{ (name.like_any(terms)) | (description.like_any(terms)) } || []
    end

    def tags(terms)
      Tag.where{ (name.like_any(terms)) } || []
    end

    # We're going to take the search string the user input, split it up into words and then
    # search for each of those words anywhere in the targetted attributes. To do that we need to
    # prepend and append each word with % to show that it can appear anywhere in the searched string.
    def get_terms(search_string)
      terms = search_string.split(' ').each { |s| s.prepend('%').concat('%') }
      terms.empty? ? ['%%'] : terms
    end
  end
end
