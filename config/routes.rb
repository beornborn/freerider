Rails.application.routes.draw do
  root to: 'dashboard#index'
  resources :users, only: [:update]
  resources :games, only: [:create, :show] do
    post :connect, on: :member
  end

  mount ActionCable.server => '/cable'
end
