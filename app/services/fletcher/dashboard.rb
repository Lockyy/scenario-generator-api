module Fletcher
  class Dashboard
    RECENTLY_ADDED_SECTION = 'recently_added'
    MOST_POPULAR_SECTION = 'most_popular'
    SECTIONS = [RECENTLY_ADDED_SECTION, MOST_POPULAR_SECTION]
    DEFAULTS = {
      RECENTLY_ADDED_SECTION => { limit: 8, offset: 0 },
      MOST_POPULAR_SECTION => {
        products: { limit: 2, offset: 0 },
        tags: { limit: 20, offset: 0 }
      }
    }

    def initialize(params = {})
      @params = params
    end

    def recently_added
      recently_added_products
    end

    def most_popular
      { products: most_popular_products, tags: most_popular_tags }
    end

    private

    def recently_added_products
      params = pagination_params(@params['recently_added'], DEFAULTS[RECENTLY_ADDED_SECTION])
      Product.recently_added.limit(params[:limit]).offset(params[:offset])
    end

    def most_popular_tags
      params = pagination_params(@params['most_popular'].try(:[], 'tags'), DEFAULTS[MOST_POPULAR_SECTION][:tags])
      Tag.most_popular.limit(params[:limit]).offset(params[:offset]).map(&:name)
    end

    def most_popular_products
      params = pagination_params(@params['most_popular'].try(:[], 'products'), DEFAULTS[MOST_POPULAR_SECTION][:products])
      Product.most_popular.limit(params[:limit]).offset(params[:offset])
    end

    def pagination_params(params, defaults)
      { limit: params.try(:[], :limit) || defaults[:limit], offset: params.try(:[], :offset) || defaults[:offset] }
    end
  end
end
