Rails.application.routes.draw do
  get 'authenticate', to: 'application#authenticate'

  resources :users, only: :update
  resources :games, only: :create do
    post :connect, on: :member
  end

  mount ActionCable.server => '/cable'

  match '*', to: 'application#index', via: :get
end
