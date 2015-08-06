ActiveAdmin.register User do
  permit_params :name, :job_title, :location, :avatar

  form do |f|
    f.semantic_errors
    inputs 'Details' do
      input :name
      input :job_title
      input :location
      input :avatar, :as => :file,  :hint => f.object.avatar.present? \
     ? image_tag(f.object.avatar.url(:thumb))
     : content_tag(:span, "no cover page yet")
    end
    f.actions
  end

  show do |ad|
    attributes_table do
      row :name
      row :job_title
      row :location
      row :avatar do
        image_tag(ad.avatar.url(:thumb))
      end
    end
  end
end

