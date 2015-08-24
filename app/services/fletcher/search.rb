module Fletcher
  class Search

    DEFAULT_PER_PAGE = 5
    MAX_PER_PAGE = 100
    DEFAULT_PAGE = 1

    def initialize(params)
      @params = default_params.merge(params).with_indifferent_access
      @terms = get_terms
      @page = @params[:page]
      @per_page = calculate_per_page(@params[:per_page].to_i)

      @products = products(@terms)
      @companies = companies(@terms)
      @tags = tags(@terms)
      @related_tags = related_tags(@products, @companies)
    end

    def results
      {
          search_string: @params[:search_string],
          page: @page,
          per_page: @per_page,
          total_results: total_results,
          companies: data_hash(@companies),
          products: data_hash(@products),
          related_tags: {
            total: @related_tags.size,
            data: @related_tags
          },
          tags: {
              total: @tags.size,
              data: @tags
          }
      }
    end

    private

    def default_params
      {
          filter_by: '',
          match_mode: 'all',
          search_string: '',
          page: DEFAULT_PAGE,
          per_page: DEFAULT_PER_PAGE
      }
    end


    def calculate_per_page(sent_per_page)
      per_page = sent_per_page || DEFAULT_PER_PAGE
      return MAX_PER_PAGE if per_page > MAX_PER_PAGE
      per_page
    end

    def paginate(data)
      data.paginate(:page => @page, :per_page => @per_page)
    end

    def total_results
      return 0 if @params[:search_string].blank?
      @companies.size + @products.size + @tags.size
    end

    def data_hash(data)
      return { total: 0, pages: 0, data: [] } if @params[:search_string].blank?

      paginated_data = paginate(data)

      {
          total: data.size,
          pages: paginated_data.total_pages,
          data: paginated_data
      }
    end

    def companies(terms)
      return [] if @params[:search_string].blank?
      SearchCompanies.new(@params[:filter_by], terms, @params[:sort_by]).results
    end

    def products(terms)
      return [] if @params[:search_string].blank?
      SearchProducts.new(@params[:filter_by], terms, @params[:sort_by]).results
    end

    def tags(terms)
      return [] if @params[:search_string].blank?
      SearchTags.new(@params[:filter_by], terms, @params[:sort_by]).results
    end

    def related_tags(products, companies)
      products.map(&:tags).flatten + companies.map(&:tags).flatten
    end

    # We're going to take the search string the user input, split it up into words and then
    # search for each of those words anywhere in the targetted attributes. To do that we need to
    # prepend and append each word with % to show that it can appear anywhere in the searched string.
    def get_terms
      @params[:search_string] = (@params[:search_string].try(:strip) || '')
      terms = @params[:match_mode] == 'all' ? [@params[:search_string]] : @params[:search_string].split(' ')
      terms = terms.collect { |s| "%#{s}%" }
      terms.empty? ? ['%%'] : terms
    end
  end
end