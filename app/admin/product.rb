ActiveAdmin.register Product do
  permit_params :name, :description, :url, :company_id, :tags, :reviews,
                default_image: [:id]

  before_filter only: [:update, :create] do
    attachment_id = params[:product][:default_image].try(:[], :id)
    @default_image = Attachment.find(attachment_id) if attachment_id
    params[:product].delete(:default_image)
    @reviews = Admin::ReviewService.reviews params[:product][:reviews_attributes], current_user
    params[:product].delete(:reviews_attributes)
  end

  controller do
    def find_resource
      begin
        scoped_collection.where(slug: params[:id]).first!
      rescue ActiveRecord::RecordNotFound
        scoped_collection.find(params[:id])
      end
    end

    def update_resource(object, attributes)
      attributes[0].merge!({default_image: @default_image})
      attributes[0].merge!({reviews: @reviews})
      super(object, attributes)
    end

    def create_resource(object)
      object.reviews= @reviews
      super(object)
    end
  end

  form do |f|
    f.semantic_errors

    inputs 'Details' do
      input :name
      input :url
      input :description
      input :company
    end

    f.inputs 'Default Image', :for => [:default_image, f.object.default_image || Attachment.new] do |image_f|
      image_f.input :id, as: :radio,
        collection: f.object.images,
        label: '',
        member_label: proc { |obj| image_tag(obj.url, :class => "custom-image") },
        wrapper_html: {class: 'thumbnail'}
    end unless f.object.new_record?

    f.inputs 'Reviews' do
      f.has_many :reviews do |t|
        t.input :id, as: :hidden
        t.input :reviewable_id, as: :hidden
        t.input :reviewable_type, as: :hidden
        t.input :title
        t.input :quality_review
        t.input :quality_score
        t.input :price_review
        t.input :price_score

        t.has_many :tags, heading: 'Tags', allow_destroy: true do |p|
          p.input :name
        end

        t.has_many :links, heading: 'Links', allow_destroy: true do |l|
          l.input :id, as: :hidden
          l.input :url
        end
      end
    end

    f.actions
  end

  index do
    id_column
    column :name
    column :url
    column :description
    column :company
    column :views
    actions
  end

  show do |ad|
    attributes_table do
      row :name
      row :url
      row :description
      row :company
      row :views
      row 'Reviews' do |n|
        reviews_links(ad.reviews)
      end
      row :default_image do
        image_tag(ad.default_image.url, :class => "custom-image")
      end unless ad.default_image.nil?
    end
  end
end
