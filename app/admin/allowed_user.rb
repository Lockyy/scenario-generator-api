ActiveAdmin.register AllowedUser do
  menu if: proc { ENV['ENABLE_WHITELIST'] }
  actions :all, except: [:edit, :show]
  permit_params :email
end
