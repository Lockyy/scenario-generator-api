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

      @filter_tags = filtered_tags(@params[:filtered_tags])
      @products = products(@terms)
      @companies = companies(@terms)
      @tags = tags(@terms)
      @related_tags = related_tags
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
          },
          filtered_tags: {
              total: @filter_tags.size,
              data: @filter_tags
          }
      }
    end

    private

    def default_params
      {
          filter_by: '',
          filter_by_tags: [],
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
      return {total: 0, pages: 0, data: [] } if @params[:search_string].blank?

      paginated_data = paginate(data)

      {
          total: data.size,
          pages: paginated_data.total_pages,
          data: paginated_data
      }
    end

    def companies(terms)
      return [] if @params[:search_string].blank?
      search_companies = SearchCompanies.new(@params[:filter_by_tags], terms, @params[:sort_by], @filter_tags)
      @companies_related_tags = search_companies.related_tags
      search_companies.results
    end

    def products(terms)
      return [] if @params[:search_string].blank?
      search_products = SearchProducts.new(@params[:filter_by_tags], terms, @params[:sort_by], @filter_tags)
      @products_related_tags = search_products.related_tags
      search_products.results
    end

    def tags(terms)
      return [] if @params[:search_string].blank?
      SearchTags.new(@params[:filter_by_tags], terms, @params[:sort_by], @filter_tags).results
    end

    def related_tags
      section = @params[:section]

      if section == 'products'
        @products_related_tags
      elsif section == 'companies'
        @companies_related_tags
      elsif section == 'tags'
        []
      else
        (@products_related_tags + @companies_related_tags).uniq
      end
    end

    def filtered_tags(filtered_tags)
      tags_names = filtered_tags[:data] if filtered_tags
      return [] if tags_names.nil? || tags_names.empty?
      tags_names.collect { |index, tag| Tag.where({name: tag[:name]}).first }
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
