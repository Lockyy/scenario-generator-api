ActiveAdmin.register Review do
  permit_params :user_id, :title, :quality_review, :quality_score, :price_review, :price_score,
                :tags, :product_id, links_attributes: [:url, :id, :_destroy]

  actions :index, :show

  before_filter only: [:update, :create] do
    tags_attributes = params[:review][:tags_attributes]
    @tags = Taggable.tags(tags_attributes)
    params[:review].delete(:tags_attributes)
  end

  controller do
    def update_resource(object, attributes)
      attributes[0].merge!({tags: @tags})
      super(object, attributes)
    end

    def create_resource(object)
      object.tags= @tags
      super(object)
    end
  end

  index do
    id_column
    column :title
    column :user
    actions
  end

  show do |ad|
    attributes_table do
      row :title
      row :quality_review
      row :quality_score
      row :price_review
      row :price_score
      row :product_id
      row :user
      row 'Tags' do |n|
        ad.tags.map(&:name).join("<br />").html_safe
      end
      row 'Links' do |n|
        ad.links.map(&:url).join("<br />").html_safe
      end
    end
  end

end

