Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :subjects, only: [:index, :show] do
        resources :generators, only: [:index, :show, :scenario] do
          get 'scenario'
        end
      end
      resources :generators, only: [:index, :show] do
        get 'scenario'
      end
    end
  end
end
