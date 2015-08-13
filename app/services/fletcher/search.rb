module Fletcher
  class Search

    DEFAULT_PER_PAGE = 5
    MAX_PER_PAGE = 100
    DEFAULT_PAGE = 1

    def initialize(params)
      @params = params
      @terms = get_terms
      @page = @params[:page] || DEFAULT_PAGE
      @per_page = calculate_per_page(@params[:per_page].to_i)

      @products = products(@terms)
      @companies = companies(@terms)
      @tags = tags(@terms)
    end

    def results
      {
        search_string: @params[:search],
        page: @page,
        per_page: @per_page,
        total_results: @companies.size + @products.size + @tags.size,
        companies: data_hash(@companies),
        products: data_hash(@products),
        tags: {
          total: @tags.size,
          data: @tags
        }
      }
    end

    private

    def calculate_per_page(sent_per_page)
      per_page = sent_per_page || DEFAULT_PER_PAGE
      return MAX_PER_PAGE if per_page > MAX_PER_PAGE
      per_page
    end

    def paginate(data)
      data.paginate(:page => @page, :per_page => @per_page)
    end

    def sort(data)
      data
    end

    def data_hash(data)
      filtered_data = paginate(sort(data))
      {
        total: data.size,
        pages: filtered_data.total_pages,
        data: filtered_data
      }
    end

    def companies(terms)
      Company.where {
        (name.like_any(terms)) | (description.like_any(terms))
      }
    end

    def products(terms)
      Product.where {
        (name.like_any(terms)) | (description.like_any(terms))
      }
    end

    def tags(terms)
      Tag.where{ (name.like_any(terms)) }
    end

    # We're going to take the search string the user input, split it up into words and then
    # search for each of those words anywhere in the targetted attributes. To do that we need to
    # prepend and append each word with % to show that it can appear anywhere in the searched string.
    def get_terms
      @params[:search].split(' ').each { |s| s.prepend('%').concat('%') }
    end
  end
end
