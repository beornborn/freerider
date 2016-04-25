Rails.application.routes.draw do
  root to: 'dashboard#index'
  resources :users, only: [:update]
  resources :games, only: [:create, :show]

  mount ActionCable.server => '/cable'
end
