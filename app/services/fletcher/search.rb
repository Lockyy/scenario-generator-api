module Fletcher
  class Search
    def initialize(params)
      @params = default_params.merge(params).with_indifferent_access
      @terms = get_terms
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
      return search_by(:companies, @params[:filter_by], terms) || []
    end

    def products(terms)
      return search_by(:products, @params[:filter_by], terms) || []
    end

    def tags(terms)
      return search_by(:tags, @params[:filter_by], terms) || []
    end

    def default_params
      {
        filter_by: '',
        match_mode: 'any',
        search_string: ''
      }
    end

    # We're going to take the search string the user input, split it up into words and then
    # search for each of those words anywhere in the targetted attributes. To do that we need to
    # prepend and append each word with % to show that it can appear anywhere in the searched string.
    def get_terms
      return ['%%'] if @params[:search].nil?
      terms = @params[:match_mode] == 'all' ? [@params[:search]] : @params[:search].split(' ')
      terms = terms.each { |s| s.prepend('%').concat('%') }
      terms.empty? ? ['%%'] : terms
    end

    def search_by(type, attribute, terms)
      ((@search_by ||= build_search_by)[type][attribute]).call(terms)
    end

    def build_search_by
      default_search_by = {
        products: Hash.new(lambda { |terms| Product.where { (name.like_any(terms)) | (description.like_any(terms)) } }),
        companies: Hash.new(lambda { |terms| Company.where { (name.like_any(terms)) | (description.like_any(terms)) } }),
        tags: Hash.new(lambda { |terms| Tag.where { (name.like_any(terms)) } }),
      }.with_indifferent_access

      default_search_by[:products][:name] = lambda { |terms| Product.where { (name.like_any(terms)) } }
      default_search_by[:products][:description] = lambda { |terms|  Product.where { (description.like_any(terms)) } }

      default_search_by[:companies][:name] = lambda { |terms| Company.where { (name.like_any(terms)) } }
      default_search_by[:companies][:description] = lambda { |terms| Company.where { (description.like_any(terms)) } }

      default_search_by[:tags][:name] = lambda { |terms| Tag.where { (name.like_any(terms)) } }
      default_search_by
    end
  end
end
