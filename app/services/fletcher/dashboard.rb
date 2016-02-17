module Fletcher
  class Dashboard
    RECENTLY_ADDED_SECTION = 'recently_added'.freeze
    MOST_POPULAR_SECTION = 'most_popular'.freeze
    RECENT_ACTIVITY_SECTION = 'recent_activity'.freeze
    BASED_ON_TAGS_SECTION = 'based_on_tags'.freeze
    COLLECTIONS_SECTION = 'collections'.freeze
    SECTIONS = [BASED_ON_TAGS_SECTION, RECENTLY_ADDED_SECTION, MOST_POPULAR_SECTION, RECENT_ACTIVITY_SECTION, COLLECTIONS_SECTION].freeze
    DEFAULTS = {
      RECENTLY_ADDED_SECTION => {
        products: { limit: 9, offset: 0 },
        tags:     { limit: 20, offset: 0 },
      },
      BASED_ON_TAGS_SECTION => { limit: 8, offset: 0 },
      MOST_POPULAR_SECTION => { limit: 5, offset: 0 },
      RECENT_ACTIVITY_SECTION => { limit: 4, offset: 0 },
      COLLECTIONS_SECTION => { limit: 4, offset: 0 },
    }.freeze

    def initialize(user, existing_ids, params = {})
      @user = user
      @params = params
      @existing_ids = existing_ids || []
    end

    def recently_added
      products = recently_added_products
      @existing_ids += products.map(&:id)
      { products: products.compact, tags: most_popular_tags.compact }
    end

    def most_popular
      products = most_popular_products
      @existing_ids += products.map(&:id)
      products.compact
    end

    def recent_activity
      params = pagination_params(@params[RECENT_ACTIVITY_SECTION], DEFAULTS[RECENT_ACTIVITY_SECTION])
      Review.sorted('latest').limit(params[:limit]).offset(params[:offset]).compact
    end

    def based_on_tags
      params = pagination_params(@params[BASED_ON_TAGS_SECTION], DEFAULTS[BASED_ON_TAGS_SECTION])
      tags = @user.tags.most_popular
      products = Product.distinct.with_tags(tags.map(&:name)).limit(params[:limit]).offset(params[:offset])
      @existing_ids += products.map(&:id)
      products.group_by { |product| (product.tags && tags).first.name }
    end

    def collections
      params = pagination_params(@params[COLLECTIONS_SECTION], DEFAULTS[COLLECTIONS_SECTION])
      Collection.all.visible(@user).latest.limit(params[:limit]).offset(params[:offset])
    end

    private

    def recently_added_products
      params = pagination_params(@params[RECENTLY_ADDED_SECTION], DEFAULTS[RECENTLY_ADDED_SECTION][:products])
      Product.where.not(id: @existing_ids).recently_added.limit(params[:limit]).offset(params[:offset])
    end

    def most_popular_tags
      params = pagination_params(@params[RECENTLY_ADDED_SECTION].try(:[], 'tags'), DEFAULTS[RECENTLY_ADDED_SECTION][:tags])
      Tag.with_products.most_popular.limit(params[:limit]).offset(params[:offset]).map { |tag| { name: tag.name, slug: tag.slug } }
    end

    def most_popular_products
      params = pagination_params(@params[MOST_POPULAR_SECTION].try(:[], 'products'), DEFAULTS[MOST_POPULAR_SECTION])
      Product.where.not(id: @existing_ids).most_popular.limit(params[:limit]).offset(params[:offset])
    end

    def pagination_params(params, defaults)
      { limit: params.try(:[], :limit) || defaults[:limit], offset: params.try(:[], :offset) || defaults[:offset] }
    end
  end
end
