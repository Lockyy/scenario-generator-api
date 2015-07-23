module Fletcher
  class Dashboard
    SECTIONS = ['recently_added', 'most_popular']

    def initialize(params = Hash.new)
      @params = params
    end

    def products
      {'recently_added': recently_added}
    end

    def recently_added
      recently_added
    end

    def most_popular
      {products: most_popular_products, tags: most_popular_tags}
    end

    private

    def recently_added
      params = @params['recently_added']
      limit = params.try(:[], 'limit') || 20
      offset = params.try(:[], 'offset') || 0

      Product.recently_added(@params['recently_added'])
    end

    def most_popular_tags
      params = @params['most_popular'].try(:[], 'tags')
      limit = params.try(:[], 'limit') || 20
      offset = params.try(:[], 'offset') || 0

      Tag.most_popular.limit(limit).offset(offset)
    end

    def most_popular_products
      params = @params['most_popular'].try(:[], 'products')
      limit = params.try(:[], 'limit') || 2
      offset = params.try(:[], 'offset') || 0

      Product.most_popular.limit(limit).offset(offset)
    end
  end
end
