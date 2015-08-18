module Fletcher
  class UpdateReview
    attr_reader :product, :review

    def initialize(user, product, params)
      @user = user
      @product = product
      @review_params = (params || {} )
    end

    def save!
      @review = fetch_review
      @review.reviewable = @product
      @review.save
    end

    def errors
      { product: @product.errors }
    end

    private

    def fetch_review
      params = {}.merge(review_params).with_indifferent_access

      params.delete(:attachments)
      params[:attachments_attributes] = attachments_params

      params.delete(:links)
      params[:links_attributes] = links_params

      params.delete(:product)
      params.delete(:tags)

      review = @user.reviews.find(params[:id])
      review.update_attributes(params)
      review.tags = tags_params.empty? ? [] : tags_params.map { |tag| Tag.where(name: tag[:name].downcase).first_or_create }

      review
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

    def review_params
      @review_params
    end
  end
end
