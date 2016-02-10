Rails.application.routes.draw do
  ActiveAdmin.routes(self)

  ########
  # Root #
  ########
  root 'site#long'

  #######
  # App #
  #######
  get 'app', to: 'app#index'
  scope :app do
    get '*route', to: 'app#index'
  end

  #######
  # API #
  #######
  namespace :api do
    namespace :v1 do
      get 'dashboard(.:format)', action: :index, controller: 'dashboard', defaults: {format: 'json'}

      ############
      # Products #
      ############
      resources :products, defaults: {format: :json} do
        resources :reviews, only: [:index, :create, :show, :update], defaults: {format: :json} do
          resources :review_votes, only: [:create, :show], defaults: {format: :json}
          delete 'review_votes', to: 'review_votes#destroy'
        end
        post 'bookmark', to: 'bookmarks#create'
        delete 'bookmark', to: 'bookmarks#destroy'
      end
      resources :bookmarks, only: [:index], defaults: {format: :json}

      ###############
      # Collections #
      ###############
      resources :collections,
                only: [ :user, :create, :show, :update, :destroy],
                defaults: {format: 'json'} do
        member do
          get 'export'
          post 'share'
          post 'products', to: 'collections#add_product'
          delete 'products/:product_id', to: 'collections#delete_product'
          delete 'leave'
        end
      end

      ###########
      # Reviews #
      ###########
      resources :reviews, except: [:index, :update, :new, :edit], defaults: {format: :json}

      #############
      # Companies #
      #############
      resources :companies, defaults: {format: 'json'} do
        member do
          patch 'tags'
        end
      end

      ########
      # Tags #
      ########
      resources :tags, only: [:index], defaults: {format: 'json'}
      resources :tag, controller: 'tags', defaults: {format: 'json'} do
        member do
          get :products
          post :follow
          post :unfollow
        end
      end
      get 'user/tags', to: 'users#followed_tags'

      ##########
      # Search #
      ##########
      get 'search',             to: 'search#index',       as: 'search', defaults: {format: :json}
      get 'search/users',       to: 'search#users',       as: 'user_search', defaults: {format: 'json'}
      get 'search/collections', to: 'search#collections', as: 'collections_search', defaults: {format: 'json'}
      get 'search/products',    to: 'search#products',    as: 'products_search', defaults: {format: 'json'}

      ########
      # User #
      ########
      resources 'users', only: [:show], defaults: {format: :json} do
        member do
          get 'recent_activity'
          patch 'tags'
        end
      end

      #################
      # Notifications #
      #################
      resources 'notifications', only: [:index], defaults: {format: :json}
    end
  end

  ##########
  # Devise #
  ##########
  devise_for  :users, only: [:omniauth_callbacks],
              controllers: { omniauth_callbacks: 'omniauth_callbacks' }

  devise_scope :user do
    get 'sign_out', to: 'users/sessions#destroy'
  end

  ##########
  # Static #
  ##########
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

end
