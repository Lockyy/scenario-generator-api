module Fletcher
  class NewReview
    attr_reader :product

    def initialize(params)
      @params = params
    end

    def save!
      @product = fetch_product!
      @product.persisted?
    end

    def errors
      { product: @product.errors }
    end

    private

    def fetch_product!
      Product.where(name: product_params['name']).first_or_create do |product|
        product.company = fetch_company!
        product.description = product_params['description']
        product.url = product_params['url']
      end
    end

    def fetch_company!
      company_params = product_params[:company] || {}
      name = company_params['name']

      Company.where(name: name).first_or_create
    end

    def product_params
      @product_params ||= (@params[:product] || {})
    end
  end
end
