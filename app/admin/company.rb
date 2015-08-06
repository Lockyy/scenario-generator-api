ActiveAdmin.register Company do
  permit_params :name, :url, :description, :avatar

  form do |f|
    f.semantic_errors
    inputs 'Details' do
      input :name
      input :url
      input :description
      input :avatar, :as => :file,  :hint => f.object.avatar.present? \
     ? image_tag(f.object.avatar.url(:thumb))
     : content_tag(:span, "no cover page yet")
    end
    f.actions
  end

  show do |ad|
    attributes_table do
      row :name
      row :url
      row :description
      row :avatar do
        image_tag(ad.avatar.url(:thumb))
      end
    end
  end
end

