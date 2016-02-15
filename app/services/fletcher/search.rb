module Fletcher
  class Search
    DEFAULT_PER_PAGE = 5
    MAX_PER_PAGE = 100
    DEFAULT_PAGE = 1

    def initialize(params, user)
      @user = user
      @params = default_params.merge(params).with_indifferent_access
      @terms = get_terms
      @page = @params[:page]
      @per_page = calculate_per_page(@params[:per_page].to_i)

      @filter_tags = filtered_tags(@params[:filtered_tags])
      @products = products(@terms)
      @companies = companies(@terms)
      @collections = collections(@terms)
      @tags = tags(@terms)
    end

    def results
      sorting = {
        tags:        @params[:sorting][:tags],
        products:    @params[:sorting][:products],
        companies:   @params[:sorting][:companies],
        collections: @params[:sorting][:collections],
      }
      match_mode = {
        tags:        @params[:match_mode][:tags],
        products:    @params[:match_mode][:products],
        companies:   @params[:match_mode][:companies],
        collections: @params[:match_mode][:collections],
      }
      related_tags = {
        products:    { data: @products_related_tags,    total: @products_related_tags.size },
        companies:   { data: @companies_related_tags,   total: @companies_related_tags.size },
        collections: { data: @collections_related_tags, total: @collections_related_tags.size },
      }
      tags = { data:  @tags, total: @tags.size }
      filtered_tags = { data:  @filter_tags, total: @filter_tags.size }

      results = {
        search_string: @params[:search_string],

        page:          @page,
        per_page:      @per_page,

        sorting:       sorting,
        match_mode:    match_mode,

        tags:          tags,
        products:      data_hash(@products),
        companies:     data_hash(@companies),
        collections:   data_hash(@collections),
        related_tags:  related_tags,
        filtered_tags: filtered_tags,
      }

      results[:total_results] = total_results(results)
      results
    end

    private

    def default_params
      {
        filter_by:      'name',
        filter_by_tags: [],
        sorting:        {
          companies:   :relevance,
          products:    :relevance,
          collections: :relevance,
          tags:        :alphabetical_order,
        },
        match_mode:     {
          companies:   'all',
          products:    'all',
          collections: 'all',
          tags:        'all',
        },
        search_string:  '',
        page:           DEFAULT_PAGE,
        per_page:       DEFAULT_PER_PAGE,
      }
    end

    def calculate_per_page(sent_per_page)
      per_page = sent_per_page || DEFAULT_PER_PAGE
      return MAX_PER_PAGE if per_page > MAX_PER_PAGE
      per_page
    end

    def paginate(data)
      data.paginate(page: @page, per_page: @per_page)
    end

    def total_results(results)
      [:companies, :tags, :products, :collections].inject(0) { |sum, type| sum + results[type][:total] }
    end

    def data_hash(data)
      build_data_hash(data, data.length)
    end

    def build_data_hash(data, data_size)
      return default_data_hash if data.size == 0
      paginated_data = paginate(data)
      {
        total: data_size,
        pages: paginated_data.total_pages,
        data:  paginated_data,
      }
    end

    def default_data_hash
      { total: 0, pages: 0, data: [] }
    end

    def companies(terms)
      return [] if @params[:search_string].blank?
      search_companies = SearchCompanies.new(@params[:filter_by], terms, @params[:sorting][:companies], @filter_tags, @params[:match_mode][:companies])
      @companies_related_tags = search_companies.related_tags
      search_companies.results
    end

    def products(terms)
      return [] if @params[:search_string].blank?
      search_products = SearchProducts.new(@params[:filter_by], terms, @params[:sorting][:products], @filter_tags, @params[:match_mode][:products])
      @products_related_tags = search_products.related_tags
      search_products.results
    end

    def collections(terms)
      search_collections = SearchCollections.new(@params[:filter_by], terms, @params[:sorting][:collections], @filter_tags, @params[:match_mode][:collections] || 'all')
      @collections_related_tags = search_collections.related_tags
      search_collections.results.visible(@user)
    end

    def tags(terms)
      return [] if @params[:search_string].blank?
      SearchTags.new(@params[:filter_by], terms, @params[:sorting][:tags], @filter_tags, @params[:match_mode][:tags]).results
    end

    def filtered_tags(filtered_tags)
      tags_names = filtered_tags[:data] if filtered_tags
      return [] if tags_names.nil? || tags_names.empty?
      tags_names.collect { |_index, tag| Tag.where(name: tag[:name]).first }
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
