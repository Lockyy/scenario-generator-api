ActiveAdmin.register Review do
  permit_params :name, :description, :url, :company_id, default_image: [:id]

  form do |f|
    f.semantic_errors
    f.inputs
    f.actions
  end
end

