Rails.application.routes.draw do
  root 'generations#index'

  namespace :pokemon do
    resources :search, only: :index
  end
end
