Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :subjects, only: [:index, :show]
      resources :generators, only: [:index, :show] do
        get 'scenario'
        get 'columns/:column_id', to: 'generators#column'
      end
    end
  end
end
