Rails.application.routes.draw do
  get 'authenticate', to: 'application#authenticate'

  mount ActionCable.server => '/cable'

  root to: 'application#index'
  get '*all' => 'application#index'
end
