class SiteController < ApplicationController
  before_action :require_login, only: [:index]

  def index
    @restaurants = current_user.restaurants_for(cookies[:filter]) if current_user
    @key = ENV["GOOGLE_API_KEY"]
  end

  def welcome
  end
end
