class SiteController < ApplicationController
  def index
    @restaurants = current_user.restaurants_for(cookies[:filter]) if current_user
    @key = ENV["GOOGLE_API_KEY"]
  end
end
