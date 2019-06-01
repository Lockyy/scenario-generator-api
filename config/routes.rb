# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :subscriptions, only: [:create]
      resources :generators, only: %i[index show] do
        resources :scenarios, only: %i[show create new update]
        resources :columns, only: [] do
          resources :scenarios, only: [:new]
        end
      end
    end
  end
end
