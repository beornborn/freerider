Rails.application.routes.draw do
  get 'authenticate', to: 'application#authenticate'

  resources :users, only: :update
  resources :games, only: :create do
    post :connect, on: :member
  end

  mount ActionCable.server => '/cable'

  root to: 'application#index'
end
