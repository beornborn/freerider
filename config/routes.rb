Rails.application.routes.draw do
  get 'authenticate', to: 'application#authenticate'

  resources :games do
    post :leave, on: :collection
  end

  mount ActionCable.server => '/cable'

  root to: 'application#index'
  get '*all' => 'application#index'
end
