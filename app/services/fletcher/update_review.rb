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
      new_attachments = []
      actual_attachments = @review.attachments

      attachments_params.each do |att|
        id = att[:id]
        deleted = att[:deleted]
        if id && deleted
          Attachment.find(id).destroy
        elsif id
          new_attachments << actual_attachments.find{|c| c.id == id}
        else
          converted_file = FileService.encoded_file_to_file(att[:attachment])
          new_attachments << Attachment.new(attachment: converted_file)
        end
      end
      params[:attachments] = new_attachments

      params.delete(:links)
      params[:links_attributes] = links_params

      params.delete(:product)
      params.delete(:tags)

      params[:price_score] = nil unless params[:price_score]
      params[:quality_score] = nil unless params[:quality_score]

      @review.tags = tags_params.empty? ? [] : tags_params.map { |tag| Tag.where(name: tag[:name]).first_or_create }
      remove_unlisted!(@review.links, params[:links_attributes])
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

    # Takes in a collection and an array of objects.
    # Gathers a list of the ids in the array of objects and removes any
    # records from the collection not in the array.
    def remove_unlisted!(collection, array_of_objects)
      ids = array_of_objects.map { |object| object['id'] }.compact
      collection.where.not(id: ids).destroy_all
    end
  end
end
