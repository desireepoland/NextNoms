Rails.application.routes.draw do
  devise_for :users
  root "site#index"
  get "/welcome" => "site#welcome", as: :welcome
  get '/auth/:provider/callback', to: 'sessions#create'
  get "/login" => "sessions#new", as: :login
  delete "/logout/" => "sessions#destroy", as: :logout
  resources :restaurants, only: [:create, :destroy, :update]
end
