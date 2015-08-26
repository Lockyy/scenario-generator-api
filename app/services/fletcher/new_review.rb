module Fletcher
  class NewReview
    attr_reader :product, :review

    def initialize(user, product, params)
      @user = user
      @product = product
      @review_params = (params || {} )
    end

    def save!
      @product = fetch_product!
      @review = build_review
      @product.reviews << @review
      @user.reviews << @review
      @product.save
    end

    def errors
      { product: @product.errors }
    end

    private

    def fetch_product!
      return @product unless @product.nil?

      params = {}.merge(product_params).with_indifferent_access
      params[:company] = fetch_company! unless company_params.empty?
      product = Product.where(name: product_params['name']).first || Product.new(params)

      return product if product.persisted?

      product.user = @user
      product
    end

    def build_review
      params = {}.merge(review_params).with_indifferent_access

      params.delete(:product)
      params.delete(:attachments)
      params.delete(:links)
      params.delete(:tags)

      review = Review.new(params)
      review.attachments.build(attachments_params) unless attachments_params.empty?
      review.links.build(links_params) unless links_params.empty?
      review.tags = fetch_tags(tags_params)

      review
    end

    def fetch_company!
      params = {}.merge(company_params).with_indifferent_access
      params.delete(:avatar)
      params.delete(:tags)
      add_avatar_info!(params)

      company = Company.where(name: params['name']).first || Company.new(params)
      company.tags = fetch_tags(company_tags_params)
      company.save!
      company
    end

    def add_avatar_info!(params)
      params[:avatar_uuid] = extract_uuid_from_url(company_avatar_params.try(:[], :url))
      params[:avatar_file_size] = company_avatar_params.try(:[], :size)
      params[:avatar_file_name] = company_avatar_params.try(:[], :name)
      params[:avatar_content_type] = company_avatar_params.try(:[], :content_type)
    end

    def extract_uuid_from_url(url)
      url.gsub(/.*?\/uploads\//, "").gsub(/\/.*/,"") if url
    end

    def fetch_tags(tags_params)
      tags_params.empty? ? [] : tags_params.map { |tag| Tag.where(name: tag[:name]).first_or_create }
    end

    def company_params
      @company_params ||= (product_params[:company] || {})
    end

    def company_tags_params
      @company_tags_params ||= (company_params[:tags] || [])
    end

    def company_avatar_params
      @company_avatar_params ||= (company_params[:avatar] || {})
    end

    def tags_params
      @tags_params ||= (review_params[:tags] || [])
    end

    def attachments_params
      @attachments_params ||= (review_params[:attachments] || [])
    end

    def links_params
      @links_params ||= (review_params[:links] || [])
    end

    def product_params
      @product_params ||= (review_params[:product] || {})
    end

    def review_params
      @review_params
    end
  end
end
