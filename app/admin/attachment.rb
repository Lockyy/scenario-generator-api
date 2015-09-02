ActiveAdmin.register Attachment do
  actions :index, :show, :list, :update, :edit, :delete, :create

  permit_params :attachable_id, :attachable_type, :url, :size, :content_type, :name
end
