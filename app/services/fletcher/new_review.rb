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
      params[:company] = fetch_company!
      params[:name].downcase! if params[:name]
      Product.where(name: product_params['name']).first || Product.new(params)
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
      company_params = {}.merge(product_params[:company] || {}).with_indifferent_access
      company_params.delete(:avatar)
      company_params.delete(:tags)

      company_params[:avatar_uuid] = extract_uuid_from_url(company_avatar_params.try(:[], :url))
      company_params[:avatar_file_size] = company_avatar_params.try(:[], :size)
      company_params[:avatar_file_name] = company_avatar_params.try(:[], :name)
      company_params[:avatar_content_type] = company_avatar_params.try(:[], :content_type)

      company = Company.where(name: company_params['name'].try(:downcase)).first
      company ||= Company.new(company_params)
      company.tags = fetch_tags(company_tags_params)
      company.save!
      company
    end

    def extract_uuid_from_url(url)
      url.gsub(/.*?\/uploads\//, "").gsub(/\/.*/,"") if url
    end

    def fetch_tags(tags_params)
      tags_params.map { |tag| Tag.where(name: tag[:name].downcase).first_or_create } unless tags_params.empty?
    end

    def company_params
      @company_params ||= (product_params[:company] || [])
    end

    def company_tags_params
      @company_tags_params ||= (company_params[:tags])
    end

    def company_avatar_params
      @company_avatar_params ||= (company_params[:avatar])
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
