Rails.application.routes.draw do
  namespace :api do
    get 'dashboard(.:format)', action: :index, controller: 'dashboard', defaults: {format: 'json'}

    resources :products do
      resources :reviews, only: [:index]
    end
    resources :reviews
    resources :companies, defaults: {format: 'json'}
  end

  devise_for :users, only: [:omniauth_callbacks], controllers: {omniauth_callbacks: 'omniauth_callbacks'}
  devise_scope :user do
    get 'sign_out', to: 'devise/sessions#destroy'
  end

  get 'long', to: 'site#long'
  get 'short', to: 'site#short'
  get 'contact', to: 'site#contact'
  get 'support', to: 'site#support'

  get 'app', to: 'app#index'
  scope :app do
    get '*route', to: 'app#index'
  end

  root 'site#long'
end
