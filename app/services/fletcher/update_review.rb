module Fletcher
  class UpdateReview
    attr_reader :review

    def initialize(review, params)
      @review = review
      @review_params = (params || {} )
    end

    def save!
      update_review!
    end

    def errors
      { review: @review.errors }
    end

    private

    def update_review!
      params = {}.merge(review_params).with_indifferent_access

      params.delete(:attachments)
      params[:attachments_attributes] = attachments_params

      params.delete(:links)
      params[:links_attributes] = links_params

      params.delete(:product)
      params.delete(:tags)

      @review.tags = tags_params.empty? ? [] : tags_params.map { |tag| Tag.where(name: tag[:name]).first_or_create }
      @review.update!(params)
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
