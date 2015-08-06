module Fletcher
  class NewReview
    attr_reader :product, :review

    def initialize(params)
      @review_params = (params || {} )
    end

    def save!
      @product = fetch_product!
      @review = build_review
      @product.reviews << @review
      @product.save
    end

    def errors
      { product: @product.errors }
    end

    private

    def fetch_product!
      params = {}.merge(product_params).with_indifferent_access
      params[:company] = fetch_company!
      Product.where(name: product_params['name']).first || Product.new(params)
    end

    def build_review
      params = {}.merge(review_params).with_indifferent_access

      params.delete(:product)
      params.delete(:attachments)

      review = Review.new(params)
      review.attachments.build(attachments_params) unless attachments_params.empty?

      review
    end

    def fetch_company!
      company_params = product_params[:company] || {}
      name = company_params['name']

      Company.where(name: name).first_or_create
    end

    def attachments_params
      @attachments_params ||= (review_params[:attachments] || [])
    end

    def product_params
      @product_params ||= (review_params[:product] || {})
    end

    def review_params
      @review_params
    end
  end
end
