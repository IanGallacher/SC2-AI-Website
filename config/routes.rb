Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :bots, only: [:index, :show]
  resources :game_results, only: [:index]
  match "/bots/upload", to: "bots#upload", via: [:post]
  get "/*path", to: "home#index"
  root "home#index"
end
