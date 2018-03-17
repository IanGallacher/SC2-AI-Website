Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope :api do
    devise_for :users
    # devise_for does not create routes to get the users.
    resources :users, only: [:index, :show]
    resources :bots, only: [:index, :show]
    resources :game_results, only: [:index]
    match "/bots/upload", to: "bots#upload", via: [:post]
    get "/*path", to: "routes#invalid"
  end
  get "/*path", to: "home#index"
  root "home#index"
end
