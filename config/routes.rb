Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  namespace :api do
    get 'dashboard(.:format)', action: :index, controller: 'dashboard', defaults: {format: 'json'}
    post 'uploads(.:format)', action: :create, controller: 's3_upload', defaults: {format: 'json'}

    resources :products, defaults: {format: :json} do
      resources :reviews, only: [:index, :create, :show, :update], defaults: {format: :json} do
        resources :review_votes, only: [:create, :show], defaults: {format: :json}
        delete 'review_votes', to: 'review_votes#destroy'
      end
      post 'bookmark', to: 'bookmarks#create'
      delete 'bookmark', to: 'bookmarks#destroy'
    end
    resources :bookmarks, only: [:index], defaults: {format: :json}

    resources :collections, only: [ :user, :create, :show,
                                    :update, :destroy],
                            defaults: {format: 'json'}

    resources :reviews, except: [:index, :update, :new, :edit], defaults: {format: :json}

    resources :companies, defaults: {format: 'json'} do
      member do
        patch 'tags'
      end
    end

    resources :tags, only: [:index], defaults: {format: 'json'}
    resources :tag, controller: 'tags', defaults: {format: 'json'} do
      member do
        get :products
        post :follow
        post :unfollow
      end
    end

    get 'search', to: 'search#index', as: 'search', defaults: {format: :json}

    get 'user/tags', to: 'users#followed_tags'
    resources 'users', only: [:show], defaults: {format: :json} do
      member do
        get 'recent_activity'
        patch 'tags'
      end
    end
  end

  devise_for  :users, only: [:omniauth_callbacks],
              controllers: { omniauth_callbacks: 'omniauth_callbacks' }

  devise_scope :user do
    get 'sign_out', to: 'users/sessions#destroy'
  end

  get 'long', to: 'site#long'
  get 'short', to: 'site#short'

  get 'contact', to: 'support#contact'
  get 'support', to: 'support#support'
  post 'support', to: 'support#submit'
  get 'submitted', to: 'support#submitted'

  get 'app', to: 'app#index'
  scope :app do
    get '*route', to: 'app#index'
  end

  root 'site#long'
end
