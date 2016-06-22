Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :subjects, only: [:index, :show]
      resources :generators, only: [:index, :show] do
        get 'generate'
        get 'random'
        get 'generate/columns/:column_id', to: 'generators#column'
        get 'scenario/:uuid', to: 'scenarios#show'
      end
    end
  end
end
