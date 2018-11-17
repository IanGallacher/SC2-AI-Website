Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # protect_from_forgery with: :exception
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope :api, defaults: { format: :json } do
    resources :authors, only: [:index, :show]
    devise_for :users, controllers: {
      sessions: 'sessions',
      registrations: 'registrations'
    }
    # Custom endpoints for login and logout.
    # We want /logout instead of /users/logout.
    devise_scope :user do
      get :login, to: 'sessions#new'
      post :login, to: 'sessions#create'
      get :logout, to: 'sessions#destroy'
    end
    # devise does not create routes to get the users.
    resources :users, only: [:index, :update] do
      get :bots, to: 'user_bots#index'
      post :create_avatar, to: 'users#upload'
    end

    resources :bots, only: [:index, :show, :create, :update, :destroy]
    resources :bots, only: [] do
      resources :mmr_histories, only: [:index]
    end

    resources :mmr_histories, only: [:index, :show]
    resources :bot_versions, only: [:show]

    resources :game_results, only: [:index, :create]
    resources :seasons, only: [:index, :show, :create] do
      resources :bots, only: [:index, :show]
      resource :next_game, only: [:show]
      resources :planned_games, only: [:index, :show, :create, :destroy]
    end
    post :password_reset, to: 'users#password_reset'
    get '/*path', to: 'routes#invalid'
  end
  get '/*path', to: 'home#index'
  root 'home#index'
end
