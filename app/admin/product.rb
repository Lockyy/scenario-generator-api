ActiveAdmin.register Product do
  permit_params :name, :description, :url, :company_id, default_image: [:id]

  before_filter only: [:update, :create] do
    attachment_id = params[:product][:default_image].try(:[], :id)
    @default_image = Attachment.find(attachment_id) if attachment_id
    params[:product].delete(:default_image)
  end

  controller do
    def update_resource(object, attributes)
      attributes[0].merge!({default_image: @default_image})
      super(object, attributes)
    end
  end


  form do |f|
    f.semantic_errors

    inputs 'Details' do
      input :name
      input :company
      input :description
    end

    inputs 'Default Image', :for => [:default_image, f.object.default_image || Attachment.new] do |image_f|
      image_f.input :id, as: :radio,
                    collection: f.object.images,
                    label: '',
                    member_label: proc { |obj| image_tag(obj.url, :class => "custom-image") },
                    wrapper_html: {class: 'thumbnail'}
    end unless f.object.new_record?

    f.actions
  end

  show do |ad|
    attributes_table do
      row :name
      row :company
      row :description
      row :reviews
      row :default_image do
        image_tag(ad.default_image.url, :class => "custom-image")
      end unless ad.default_image.nil?
    end
  end
end
