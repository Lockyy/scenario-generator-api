Rails.application.routes.draw do
  devise_for :users, only: [:omniauth_callbacks], controllers: { omniauth_callbacks: 'omniauth_callbacks' }
  root 'pages#index'
end
