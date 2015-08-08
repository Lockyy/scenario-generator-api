ActiveAdmin.register Review do
  permit_params :user_id, :title, :quality_review, :quality_score, :price_review, :price_score, :reviewable_type

  form do |f|
    f.semantic_errors
    f.inputs
    f.actions
  end
end

