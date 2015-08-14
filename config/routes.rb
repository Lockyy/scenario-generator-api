Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  namespace :api do
    get 'dashboard(.:format)', action: :index, controller: 'dashboard', defaults: {format: 'json'}
    post 'uploads(.:format)', action: :create, controller: 's3_upload', defaults: {format: 'json'}

    resources :products, defaults: {format: :json} do
      resources :reviews, only: [:index, :create], defaults: {format: :json}
    end

    resources :reviews, except: [:index], defaults: {format: :json}
    resources :companies, defaults: {format: 'json'}

    get 'search', to: 'search#index', as: 'search', defaults: {format: :json}
    get 'users/current', defaults: {format: :json}
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
