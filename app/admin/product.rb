ActiveAdmin.register Product do
  permit_params :name, :description, :url, :company_id

  form do |f|
    f.semantic_errors
    f.inputs
    f.actions
  end

  show do |ad|
    attributes_table do
    f.inputs
    end
  end
end

