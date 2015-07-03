Rails.application.routes.draw do
  root 'site#long'
  get 'long', to: 'site#long'
  get 'short', to: 'site#short'
  get 'contact', to: 'site#contact'
  get 'support', to: 'site#support'
end
