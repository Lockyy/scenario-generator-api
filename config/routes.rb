Rails.application.routes.draw do
  devise_for :users, only: [:omniauth_callbacks], controllers: { omniauth_callbacks: 'omniauth_callbacks' }

  root 'site#long'
  get 'long', to: 'site#long'
  get 'short', to: 'site#short'
  get 'contact', to: 'site#contact'
  get 'support', to: 'site#support'
end
