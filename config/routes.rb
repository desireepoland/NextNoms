Rails.application.routes.draw do
  root "site#index"
  match '/auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  get "/login" => "sessions#new", as: :login
  delete "/logout/" => "sessions#destroy", as: :logout
  get "/auth/failure", to: "sessions#failure"
  get "/roulette" => "restaurants#roulette", as: :roulette
  get "/discover" => "restaurants#discover", as: :discover
  get "/about" => "site#about", as: :about
  resources :restaurants, only: [:create, :destroy, :update]
  resources :identities
end
