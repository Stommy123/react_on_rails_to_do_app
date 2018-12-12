Rails.application.routes.draw do
  devise_for :users
  root 'tasks#index'
  resources :tasks, only: [:index, :create, :destroy, :update] do
    resources :sub_tasks, only: [:index, :create, :update, :destroy], shallow: true
  end

  resource :calendar, only: [:show]
  resource :map, only: [:show]
end
