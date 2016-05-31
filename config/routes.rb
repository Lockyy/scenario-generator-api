Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :subjects, only: [:index, :show]
      resources :generators, only: [:index, :show] do
        get 'scenario'
        get 'random'
        get 'scenario/columns/:column_id', to: 'generators#column'
      end
    end
  end
end
