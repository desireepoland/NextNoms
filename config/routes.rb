Rails.application.routes.draw do
  root "site#index"
  match '/auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  get "/login" => "sessions#new", as: :login
  delete "/logout/" => "sessions#destroy", as: :logout
  get "/auth/failure", to: "sessions#failure"
  resources :restaurants, only: [:create, :destroy, :update]
  resources :identities
end
