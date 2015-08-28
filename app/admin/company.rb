ActiveAdmin.register Company do
  permit_params :name, :url, :description, :avatar

  controller do
    def find_resource
      begin
        scoped_collection.where(slug: params[:id]).first!
      rescue ActiveRecord::RecordNotFound
        scoped_collection.find(params[:id])
      end
    end
  end

  form do |f|
    f.semantic_errors
    inputs 'Details' do
      input :name
      input :url
      input :description
      input :avatar, :as => :file, :hint => f.object.avatar.present? \
     ? image_tag(f.object.avatar.url(:thumb), :class => "custom-image")
                   : content_tag(:span, "no cover page yet")
    end
    f.actions
  end

  index do
    id_column
    column :name
    column :url
    column :description
    actions
  end

  show do |ad|
    attributes_table do
      row :name
      row :url
      row :description
      row :avatar do
        image_tag(ad.avatar.url(:thumb), :class => "custom-image")
      end
    end
  end
end
