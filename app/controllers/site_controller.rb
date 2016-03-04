class SiteController < ApplicationController
  def index
    @restaurants = current_user.restaurants.order("users_restaurants.tried ASC") if current_user
    @key = ENV["GOOGLE_API_KEY"]
  end
end
