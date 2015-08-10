ActiveAdmin.register Review do
  permit_params :user_id, :title, :quality_review, :quality_score, :price_review, :price_score, :reviewable_type

  form do |f|
    f.semantic_errors
    inputs 'Details' do
      input :title
      input :quality_review
      input :quality_score
      input :price_review
      input :price_score
      input :reviewable_type
      input :reviewable_id
      input :user
      end
    f.actions
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
      row :reviewable_type
      row :reviewable_id
      row :user
    end
  end

end

