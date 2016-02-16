ActiveAdmin.register Product do
  permit_params :name, :description, :url, :company_id, :tags, :reviews,
                default_image: [:id]

  actions :index, :show, :list, :update, :edit, :delete

  before_filter only: [:update, :create] do
    attachment_id = params[:product][:default_image].try(:[], :id)
    @default_image = Attachment.find(attachment_id) if attachment_id
    custom_attachment = params[:product][:custom_attachment]
    if custom_attachment
      @custom_attachment = Attachment.new
      @custom_attachment.attachment = params[:product][:custom_attachment]
    end

    params[:product].delete(:default_image)
    params[:product].delete(:custom_attachment)
    @reviews = Admin::ReviewService.reviews params[:product][:reviews_attributes], current_user
    params[:product].delete(:reviews_attributes)
  end

  controller do
    def find_resource
      scoped_collection.where(slug: params[:id]).first!
    rescue ActiveRecord::RecordNotFound
      scoped_collection.find(params[:id])
    end

    def update_resource(object, attributes)
      attributes[0][:default_image] = @default_image
      attributes[0][:custom_attachments] = [@custom_attachment] if @custom_attachment
      attributes[0][:reviews] = @reviews
      super(object, attributes)
    end

    def create_resource(object)
      object.reviews = @reviews
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

    f.inputs 'Add custom attachment', class: 'test' do
      li class: 'input loading hide', value: 'Loading' do
        span class: 'label' do
          'Loading'
        end
      end

      f.input :custom_attachment, as: :file, input_html: { class: 'custom_attachment', data: { product_id: f.object.id } }
    end unless f.object.new_record?

    f.inputs 'Default Image', for: [:default_image, f.object.default_image || Attachment.new], class: 'inputs default_image' do |image_f|
      image_f.input :id, as:           :radio,
                         collection:   f.object.images,
                         label:        '',
                         member_label: proc { |obj| image_tag(obj.attachment.url, class: 'custom-image') },
                         wrapper_html: { class: 'thumbnail' }
    end unless f.object.new_record?

    f.inputs 'Reviews' do
      f.has_many :reviews do |t|
        t.input :id, as: :hidden
        t.input :product_id, as: :hidden
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
    end unless f.object.new_record?

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
      row 'Reviews' do |_n|
        reviews_links(ad.reviews)
      end
      row :default_image do
        image_tag(ad.default_image.attachment.url, class: 'custom-image')
      end unless ad.default_image.nil?
    end
  end
end
